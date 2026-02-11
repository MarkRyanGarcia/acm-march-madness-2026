import re
from typing import Tuple
from datetime import datetime, timedelta, timezone


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


def normalize_utc(dt: datetime) -> datetime:
    """Ensure DB timestamps are UTC-aware."""
    return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)


def get_submission_cooldown(attempts: int, last_submitted: datetime) -> datetime:
    last_submitted = normalize_utc(last_submitted)

    cooldown_base = timedelta(seconds=30)
    cooldown_max = timedelta(minutes=5)

    duration = cooldown_base
    if attempts > 2:
        duration *= attempts - 1

    return last_submitted + min(duration, cooldown_max)


def get_remaining_cooldown_seconds(
    cooldown_until: datetime, submitted_at: datetime
) -> float:
    return max((cooldown_until - submitted_at).total_seconds(), 0.0)


def calculate_submission_score_h(max_points: int, h: float) -> float:
    if h <= 0.0:
        return float(max_points)
    if h >= 24.0:
        return float(max_points) / 2.0

    return ((max_points) / 1152) * (h - 24.0) ** 2 + max_points / 2.0


def calculate_submission_score(
    max_points: int, released_at: datetime, submitted_at: datetime
) -> float:
    """
    Calculates the score based on when the problem was released and when the
    user submitted the answer for the problem.
    """
    seconds = (submitted_at - released_at).total_seconds()
    return calculate_submission_score_h(max_points, seconds / 3600)
