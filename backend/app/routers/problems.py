from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.responses import FileResponse
from app.deps.db import get_db
from app.schemas.problem import ProblemOut
from app.utils.problem import split_problem_parts
from problems.event import PROBLEMS


router = APIRouter()


# Need to send this as part 1 and part 2, separately
@router.get("/problems/{day}", response_model=ProblemOut)
def get_problem(day: int, _: Annotated[Session, Depends(get_db)]):
    problem = PROBLEMS.get(day)
    if not problem:
        raise HTTPException(404, "Invalid problem day, must be between 0 - 5")

    with open(problem.readme_path) as file:
        content = file.read()

    part1, part2 = split_problem_parts(content)

    return ProblemOut(
        part1=part1,
        part2="",
        part1_answer=None,
        part2_answer=None,
    )
