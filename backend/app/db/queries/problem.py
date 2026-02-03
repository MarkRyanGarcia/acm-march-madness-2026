from typing import List
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.db.models.team_submit_attempt import TeamSubmitAttempt
from app.utils.problem import problem_id


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
