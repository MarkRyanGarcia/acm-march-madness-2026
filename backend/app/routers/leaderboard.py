from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.deps.db import get_db
from app.schemas.leaderboard import LeaderboardEntry
from sqlalchemy import select, func
from app.db.models import Team, TeamPoint, TeamSubmitAttempt

router = APIRouter()


@router.get("/leaderboard", response_model=list[LeaderboardEntry])
def get_leaderboard(db: Annotated[Session, Depends(get_db)]):
    # total points per team
    points_subq = (
        select(
            TeamPoint.team_id,
            func.coalesce(func.sum(TeamPoint.points), 0).label("total_points"),
        )
        .group_by(TeamPoint.team_id)
        .subquery()
    )

    # solved problems per team (distinct correct submissions)
    solved_subq = (
        select(
            TeamSubmitAttempt.team_id,
            func.array_agg(func.distinct(TeamSubmitAttempt.problem_id)).label(
                "solved_problems"
            ),
        )
        .where(TeamSubmitAttempt.correct.is_(True))
        .group_by(TeamSubmitAttempt.team_id)
        .subquery()
    )

    stmt = (
        select(
            Team.id,
            Team.team_name,
            func.coalesce(points_subq.c.total_points, 0).label("total_points"),
            func.coalesce(solved_subq.c.solved_problems, []).label("solved_problems"),
        )
        .outerjoin(points_subq, Team.id == points_subq.c.team_id)
        .outerjoin(solved_subq, Team.id == solved_subq.c.team_id)
        .order_by(func.coalesce(points_subq.c.total_points, 0).desc())
    )

    rows = db.execute(stmt).all()

    leaderboard = []
    for row in rows:
        leaderboard.append(
            LeaderboardEntry(
                team_id=row.id,
                team_name=row.team_name,
                total_points=row.total_points,
                solved_problems=row.solved_problems,
            )
        )

    return leaderboard
