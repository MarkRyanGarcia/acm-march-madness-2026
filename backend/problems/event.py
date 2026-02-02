from dataclasses import dataclass
from typing import Type
from problems.base import Problem
from problems._00_math_homework.main import MathHomework


@dataclass(frozen=True)
class ProblemEntry:
    day: int
    problem_class: Type[Problem]
    readme_path: str
    points_per_part: int


PROBLEMS: dict[int, ProblemEntry] = {
    0: ProblemEntry(
        day=0,
        problem_class=MathHomework,
        readme_path="problems/_00_math_homework/README.md",
        points_per_part=0,
    )
}
