from fastapi import APIRouter, HTTPException
from starlette.responses import FileResponse
from problems.event import PROBLEMS


router = APIRouter()


@router.get("/problems/{day}")
def get_problem(day: int):
    problem = PROBLEMS.get(day)
    if not problem:
        raise HTTPException(404, "Invalid problem day, must be between 0 - 5")

    return FileResponse(path=problem.readme_path, media_type="text/markdown")
