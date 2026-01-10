import os
from fastapi import APIRouter
from starlette.responses import FileResponse


router = APIRouter()


@router.get("/problems/{day}")
def get_problem(day: int):
    print("CALLED THIS ENDPOINT")
    input_file_path = os.path.join("problems", "00-math-homework", "README.md")

    return FileResponse(
        path=input_file_path, filename=f"0{day}README.md", media_type="text/markdown"
    )
