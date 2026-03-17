from datetime import datetime, timezone
from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session
from app.deps.auth import get_optional_auth_id, require_clerk_auth
from app.deps.db import get_db
from app.schemas.problem import ProblemListOut, ProblemOut, ProblemSubmitAttempt
from app.utils.problem import (
    calculate_submission_score,
    get_remaining_cooldown_seconds,
    get_seed,
    get_submission_cooldown,
    problem_id,
    split_problem_parts,
)
from app.db.models.team_point import TeamPoint
from app.db.models.team_submit_attempt import TeamSubmitAttempt
from problems.event import PROBLEMS
import app.db.queries.problem as problem_queries
import app.db.queries.team as team_queries

router = APIRouter()


@router.get("/problems", response_model=List[ProblemListOut])
def get_problems():
    now = datetime.now(timezone.utc)
    return [
        ProblemListOut(
            day=day,
            released=not problem.release_time or now >= problem.release_time,
            release_time=problem.release_time,
        )
        for day, problem in PROBLEMS.items()
    ]

@router.get("/problems/{day}", response_model=ProblemOut)
def get_problem(
    day: int,
    auth_id: Annotated[str | None, Depends(get_optional_auth_id)],
    db: Annotated[Session, Depends(get_db)],
):
    problem_entry = PROBLEMS.get(day)
    if not problem_entry:
        raise HTTPException(404, "Invalid problem day, must be between 0 - 5")
    
    if (
        problem_entry.release_time
        and (now := datetime.now(timezone.utc)) < problem_entry.release_time
    ):
        remaining = (problem_entry.release_time - now).total_seconds()
        raise HTTPException(
            404,
            detail={
                "message": "Problem has not been released yet",
                "remaining_seconds": int(remaining),
                "release_time": problem_entry.release_time.isoformat(),
            },
        )

    with open(problem_entry.readme_path) as file:
        content = file.read()

    part1_text, part2_text = split_problem_parts(content)

    # Base response for anonymous users
    default_response = ProblemOut(
        is_signed_in=auth_id is not None,
        can_submit=False,
        part1=part1_text,
        part2="",
        part1_answer=None,
        part2_answer=None,
    )

    if not auth_id:
        return default_response

    team = team_queries.get_team_for_user(db, auth_id)
    if not team:
        return default_response

    # Fetch all correct attempts for this team and day
    correct_records = problem_queries.get_correct_answers(db, team.id, day)
    
    # FIX: Explicitly find the specific record for each part
    # This prevents Part 1 and Part 2 from mirroring each other or 
    # locking the user out based on list order.
    p1_id = problem_id(day, 1) # This should result in 'dayX/part1'
    p2_id = problem_id(day, 2) # This should result in 'dayX/part2'

    p1_record = next((a for a in correct_records if a.problem_id == p1_id), None)
    p2_record = next((a for a in correct_records if a.problem_id == p2_id), None)

    solved_part1 = p1_record is not None
    solved_part2 = p2_record is not None

    return ProblemOut(
        is_signed_in=True,
        can_submit=True,
        part1=part1_text,
        # Only show Part 2 text if Part 1 is officially solved
        part2=part2_text if solved_part1 else "",
        part1_answer=p1_record.answer if solved_part1 else None,
        part2_answer=p2_record.answer if solved_part2 else None,
    )


@router.get("/problems/{day}/input", response_class=PlainTextResponse)
def get_problem_input(
    day: int,
    auth_id: Annotated[str, Depends(require_clerk_auth)],
    db: Annotated[Session, Depends(get_db)],
):
    team = team_queries.get_team_for_user(db, auth_id)
    if not team:
        raise HTTPException(404, "User does not belong to a team")

    problem_entry = PROBLEMS.get(day)
    if not problem_entry:
        raise HTTPException(404, "Invalid problem day, must be between 0 - 5")

    problem = problem_entry.problem_class(seed=get_seed(team.id))

    return PlainTextResponse(
        content=problem.generate_input(),
        headers={"Content-Disposition": f'inline; filename="day-{day}-input.txt"'},
    )


@router.post("/problems/{day}/submit")
def submit_answer(
    day: int,
    attempt: ProblemSubmitAttempt,
    auth_id: Annotated[str, Depends(require_clerk_auth)],
    db: Annotated[Session, Depends(get_db)],
):
    if not auth_id:
        raise HTTPException(401, "Unauthorized. Sign in to submit your answer.")

    team = team_queries.get_team_for_user(db, auth_id)
    if not team:
        raise HTTPException(404, "User does not belong to a team")

    problem_entry = PROBLEMS.get(day)
    if not problem_entry:
        raise HTTPException(400, "Invalid problem day, must be between 0 - 5")

    part = attempt.part
    if part not in [1, 2]:
        raise HTTPException(400, f"Invalid part submission: {part}")

    # 1. FIX: Explicitly check which parts are solved by ID, not by count
    correct_answers = problem_queries.get_correct_answers(db, team.id, day)
    
    p1_id = problem_id(day, 1) # 'day2/part1'
    p2_id = problem_id(day, 2) # 'day2/part2'
    
    solved_p1 = any(a.problem_id == p1_id for a in correct_answers)
    solved_p2 = any(a.problem_id == p2_id for a in correct_answers)

    # 2. Refined Validation Logic
    if part == 1 and solved_p1:
        raise HTTPException(400, f"Day {day} part 1 already solved")
    
    if part == 2:
        if solved_p2:
            raise HTTPException(400, f"Day {day} part 2 already solved")
        if not solved_p1:
            raise HTTPException(400, "Submit part 1 first before attempting part 2")

    # 3. Cooldown Logic
    attempts_count = problem_queries.get_attempts_for_part(db, team.id, day, part)
    last_submitted = problem_queries.get_last_attempt_time(db, team.id, day, part)
    submitted_at = datetime.now(timezone.utc)

    if last_submitted:
        # If your last_submitted is naive, make it aware for the comparison
        if last_submitted.tzinfo is None:
            last_submitted = last_submitted.replace(tzinfo=timezone.utc)
            
        cooldown_until = get_submission_cooldown(attempts_count, last_submitted)
        remaining = get_remaining_cooldown_seconds(cooldown_until, submitted_at)
        if remaining > 0:
            return {
                "correct": None,
                "error": True,
                "message": "Cooldown in effect",
                "remaining_cooldown_seconds": int(remaining),
            }

    # 4. Check Answer
    try:
        user_ans = int(attempt.answer)
    except ValueError:
        user_ans = -1 # Or handle as invalid input

    problem_instance = problem_entry.problem_class(seed=get_seed(team.id))
    correct = problem_instance.check_answer(part, user_ans)

    if correct:
        # Ensure release_time is timezone-aware for the score calculation
        release_time = problem_entry.release_time
        if release_time is None:
            release_time = datetime(1970, 1, 1, tzinfo=timezone.utc)
        elif release_time.tzinfo is None:
            release_time = release_time.replace(tzinfo=timezone.utc)

        points = calculate_submission_score(
            problem_entry.points_per_part,
            release_time,
            submitted_at,
        )
        
        db.add(TeamPoint(
            team_id=team.id,
            points=points,
            reason=f"Solved Day {day} Part {part} correctly",
            added_at=submitted_at # Ensure this matches the attempt time
        ))
        db.flush()

    # 5. Record the Attempt
    new_attempt = TeamSubmitAttempt(
        team_id=team.id,
        problem_id=problem_id(day, part),
        answer=user_ans,
        correct=correct,
        submitted_by_user_id=auth_id,
        submitted_at=submitted_at
    )
    db.add(new_attempt)
    db.commit()

    return {
        "correct": correct,
        "error": False,
        "part_solved": part if correct else None,
        "next_part": (part + 1) if (correct and part == 1) else part
    }