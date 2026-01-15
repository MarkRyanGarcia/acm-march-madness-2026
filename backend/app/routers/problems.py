from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session
from app.deps.auth import require_clerk_auth
from app.deps.db import get_db
from app.schemas.problem import ProblemOut, ProblemSubmitAttempt
from app.utils.problem import get_seed, split_problem_parts
from backend.app.db.models.team_submit_attempt import TeamSubmitAttempt
from problems.event import PROBLEMS
import app.db.queries.team as team_queries

router = APIRouter()


@router.get("/problems/{day}", response_model=ProblemOut)
def get_problem(day: int):
    problem = PROBLEMS.get(day)
    if not problem:
        raise HTTPException(404, "Invalid problem day, must be between 0 - 5")

    with open(problem.readme_path) as file:
        content = file.read()

    part1, _ = split_problem_parts(content)

    return ProblemOut(
        part1=part1,
        part2="",
        part1_answer=None,
        part2_answer=None,
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
    team = team_queries.get_team_for_user(db, auth_id)
    if not team:
        raise HTTPException(404, "User does not belong to a team")

    problem_entry = PROBLEMS.get(day)
    if not problem_entry:
        raise HTTPException(404, "Invalid problem day, must be between 0 - 5")

    problem = problem_entry.problem_class(seed=get_seed(team.id))
    correct = problem.check_answer(attempt.part, attempt.answer)
    
    team_submit_attempt = TeamSubmitAttempt(
        team_id=team.id,
        problem_id=str(day),
        correct=correct,
        submitted_by_user_id=auth_id,
    )
    db.add(team_submit_attempt)
    db.commit()
    db.refresh(team_submit_attempt)
    
    return {"correct": correct}