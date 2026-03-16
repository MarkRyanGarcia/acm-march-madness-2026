from dataclasses import dataclass
from datetime import datetime
from typing import Optional, Type
from problems.base import Problem
from problems._00_math_homework.main import MathHomework
from problems._01_the_muddy_arrival.main import MuddyArrival
from zoneinfo import ZoneInfo


@dataclass(frozen=True)
class ProblemEntry:
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
        problem_class=MathHomework,
        readme_path="problems/_00_math_homework/README.md",
        points_per_part=0,
        release_time=None,
    ),
    1: ProblemEntry(
        problem_class=MuddyArrival,
        readme_path="problems/_01_the_muddy_arrival/README.md",
        points_per_part=100,
        release_time=get_release_time(2026, 3, 16, 14, 0, 0),
    ),
    2: ProblemEntry(
        problem_class=MathHomework,
        readme_path="problems/_00_math_homework/README.md",
        points_per_part=100,
        release_time=get_release_time(2026, 3, 17, 14, 0, 0),
    ),
    3: ProblemEntry(
        problem_class=MathHomework,
        readme_path="problems/_00_math_homework/README.md",
        points_per_part=100,
        release_time=get_release_time(2026, 3, 18, 14, 0, 0),
    ),
    4: ProblemEntry(
        problem_class=MathHomework,
        readme_path="problems/_04_the_climb/README.md",
        points_per_part=100,
        release_time=get_release_time(2026, 3, 19, 14, 0, 0),
    ),
    5: ProblemEntry(
        problem_class=MathHomework,
        readme_path="problems/_00_math_homework/README.md",
        points_per_part=100,
        release_time=get_release_time(2026, 3, 20, 14, 0, 0),
    ),
}
