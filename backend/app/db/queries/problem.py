from datetime import datetime
from typing import List, Optional
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.db.models.team_submit_attempt import TeamSubmitAttempt
from app.utils.problem import problem_id


def get_last_attempt_time(
    db: Session, team_id: int, day: int, part: int
) -> Optional[datetime]:
    return (
        db.query(TeamSubmitAttempt.submitted_at)
        .filter(
            TeamSubmitAttempt.team_id == team_id,
            TeamSubmitAttempt.problem_id == problem_id(day, part),
        )
        .order_by(TeamSubmitAttempt.submitted_at.desc())
        .limit(1)
        .scalar()
    )


def get_attempts_for_part(db: Session, team_id: int, day: int, part: int) -> int:
    part_id = problem_id(day, part)

    attempts = db.scalar(
        select(func.count())
        .select_from(TeamSubmitAttempt)
        .filter(
            TeamSubmitAttempt.team_id == team_id,
            TeamSubmitAttempt.problem_id == part_id,
        )
    )

    return attempts if attempts else 0


def get_correct_answers(db: Session, team_id: int, day: int) -> List[TeamSubmitAttempt]:
    part1_id = problem_id(day, 1)
    part2_id = problem_id(day, 2)

    return (
        db.query(TeamSubmitAttempt)
        .filter(
            TeamSubmitAttempt.team_id == team_id,
            TeamSubmitAttempt.correct,
            or_(
                TeamSubmitAttempt.problem_id == part1_id,
                TeamSubmitAttempt.problem_id == part2_id,
            ),
        )
        .all()
    )


def get_correct_count(db: Session, team_id: int, day: int) -> int:
    part1_id = problem_id(day, 1)
    part2_id = problem_id(day, 2)

    correct_count = db.scalar(
        select(func.count())
        .select_from(TeamSubmitAttempt)
        .filter(
            TeamSubmitAttempt.team_id == team_id,
            TeamSubmitAttempt.correct,
            or_(
                TeamSubmitAttempt.problem_id == part1_id,
                TeamSubmitAttempt.problem_id == part2_id,
            ),
        )
    )

    return correct_count if correct_count is not None else 0
