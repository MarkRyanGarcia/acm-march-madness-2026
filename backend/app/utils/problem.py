from datetime import datetime, timedelta
import re
from typing import Tuple


def split_problem_parts(content: str) -> Tuple[str, str]:
    """
    Splits the string into part1 (including title), and part 2 with the rest
    """
    parts = re.split(r"(?m)(?=^## Part Two$)", content, maxsplit=1)
    if len(parts) != 2:
        raise ValueError("Content does not contain '## Part Two' heading")

    return parts[0], parts[1]


def get_seed(id: int) -> int:
    """
    Why? Because why not ;)
    """
    return id ^ 0x5F3759DF


def problem_id(day: int, part: int) -> str:
    return f"day{day}/part{part}"


def get_submission_cooldown(attempts: int, last_submitted: datetime) -> datetime:
    cooldown_base = timedelta(seconds=30)
    cooldown_max = timedelta(minutes=5)

    duration = cooldown_base
    if attempts >= 2:
        duration *= attempts

    return last_submitted + min(duration, cooldown_max)
