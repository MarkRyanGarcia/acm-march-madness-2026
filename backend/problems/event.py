from dataclasses import dataclass
from datetime import datetime
from typing import Optional, Type
from problems.base import Problem
from problems._00_math_homework.main import MathHomework
from zoneinfo import ZoneInfo


@dataclass(frozen=True)
class ProblemEntry:
    day: int
    problem_class: Type[Problem]
    readme_path: str
    points_per_part: int
    release_time: Optional[datetime]


def get_release_time(
    year: int, month: int, day: int, hour: int, minute: int, second: int
):
    """
    `get_release_time` is used to declare release times in PST, applying the
    correct offset when comparing with other offset-aware datetime objects
    """

    pst_tz = ZoneInfo("America/Los_Angeles")
    return datetime(year, month, day, hour, minute, second, tzinfo=pst_tz)


PROBLEMS: dict[int, ProblemEntry] = {
    0: ProblemEntry(
        day=0,
        problem_class=MathHomework,
        readme_path="problems/_00_math_homework/README.md",
        points_per_part=0,
        release_time=None,
    )
}
