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
    problem = PROBLEMS.get(day)
    if not problem:
        raise HTTPException(404, "Invalid problem day, must be between 0 - 5")
    if (
        problem.release_time
        and (now := datetime.now(timezone.utc)) < problem.release_time
    ):
        remaining = (problem.release_time - now).total_seconds()
        raise HTTPException(
            404,
            detail={
                "message": "Problem has not been released yet",
                "remaining_seconds": int(remaining),
                "release_time": problem.release_time.isoformat(),
            },
        )

    with open(problem.readme_path) as file:
        content = file.read()

    part1, part2 = split_problem_parts(content)

    default_response = ProblemOut(
        part1=part1,
        part2="",
        part1_answer=None,
        part2_answer=None,
    )

    if not auth_id:
        return default_response

    team = team_queries.get_team_for_user(db, auth_id)
    if not team:
        return default_response

    correct_answers = problem_queries.get_correct_answers(db, team.id, day)
    # Assuming that users can only submit if they haven't solved it yet
    solved_part1 = len(correct_answers) > 0
    solved_part2 = len(correct_answers) == 2

    return ProblemOut(
        part1=part1,
        part2=part2 if solved_part1 else "",
        part1_answer=correct_answers[0].answer if solved_part1 else None,
        part2_answer=correct_answers[1].answer if solved_part2 else None,
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
    if auth_id == "":
        raise HTTPException(401, "Unauthorized. Sign in to submit your answer.")

    team = team_queries.get_team_for_user(db, auth_id)
    if not team:
        raise HTTPException(404, "User does not belong to a team")

    problem_entry = PROBLEMS.get(day)
    if not problem_entry:
        raise HTTPException(400, "Invalid problem day, must be between 0 - 5")

    part = attempt.part
    if part != 1 and part != 2:
        raise HTTPException(400, f"Invalid part submission: {attempt.part}")

    correct_count = problem_queries.get_correct_count(db, team.id, day)

    if correct_count == 2:
        raise HTTPException(400, f"Day {day} already solved")
    if part == 1 and correct_count == 1:
        raise HTTPException(400, f"Day {day} part 1 already solved")
    if part == 2 and correct_count == 0:
        raise HTTPException(400, f"Submit part 1 first before attempting part 2")

    attempts = problem_queries.get_attempts_for_part(db, team.id, day, part)
    last_submitted = problem_queries.get_last_attempt_time(db, team.id, day, part)
    submitted_at = datetime.now(timezone.utc)

    if last_submitted:
        cooldown_until = get_submission_cooldown(attempts, last_submitted)
        remaining = get_remaining_cooldown_seconds(cooldown_until, submitted_at)
        if remaining != 0.0:
            return {
                "correct": None,
                "error": True,
                "cooldown_until": cooldown_until.isoformat(),
                "remaining_cooldown_seconds": int(remaining),
            }

    answer = 0
    try:
        answer = int(attempt.answer)
    except:
        pass

    problem = problem_entry.problem_class(seed=get_seed(team.id))
    correct = problem.check_answer(part, answer)

    if correct:
        points_per_part = problem_entry.points_per_part
        release_time = problem_entry.release_time
        if release_time is None:
            release_time = datetime(1970, 1, 1, tzinfo=timezone.utc)
        points = calculate_submission_score(
            points_per_part,
            release_time,
            submitted_at,
        )
        team_points = TeamPoint(
            team_id=team.id,
            points=points,
            reason=f"Solved Day {day} Part {part} correctly",
        )
        db.add(team_points)
        db.flush()

    team_submit_attempt = TeamSubmitAttempt(
        team_id=team.id,
        problem_id=problem_id(day, part),
        answer=answer,
        correct=correct,
        submitted_by_user_id=auth_id,
    )
    db.add(team_submit_attempt)
    db.commit()
    db.refresh(team_submit_attempt)

    last_submitted = team_submit_attempt.submitted_at
    cooldown_until = get_submission_cooldown(attempts + 1, last_submitted)
    remaining = get_remaining_cooldown_seconds(cooldown_until, submitted_at)

    return {
        "correct": correct,
        "error": False,
        "cooldown_until": cooldown_until.isoformat() if not correct else None,
        "remaining_cooldown_seconds": int(remaining) if not correct else 0,
    }
