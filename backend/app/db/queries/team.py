from typing import List
from sqlalchemy.orm import Session, joinedload
from app.db.models import Team, TeamMember


def get_team_for_user(db: Session, user_id: str) -> Team | None:
    membership = db.query(TeamMember).filter(TeamMember.user_id == user_id).first()
    if not membership:
        return None

    return (
        db.query(Team)
        .options(joinedload(Team.members).joinedload(TeamMember.user))
        .filter(Team.id == membership.team_id)
        .first()
    )


def get_team_by_id(db: Session, team_id: int) -> Team | None:
    db.query(Team).filter_by(id=team_id).first()


def get_team_by_invite_code(db: Session, invite_code: str) -> Team | None:
    return db.query(Team).filter_by(invite_code=invite_code).first()


def get_team_members(db: Session, team_id: int) -> List[TeamMember]:
    return (
        db.query(TeamMember)
        .filter(TeamMember.team_id == team_id)
        .order_by(TeamMember.joined_at)
        .all()
    )


def get_membership(db: Session, user_id: str) -> TeamMember | None:
    return db.query(TeamMember).filter_by(user_id=user_id).first()


def get_membership_for_team(
    db: Session, team_id: int, user_id: str
) -> TeamMember | None:
    return db.query(TeamMember).filter_by(team_id=team_id, user_id=user_id).first()


def get_membership_with_team(db: Session, user_id: str):
    db.query(TeamMember).options(
        joinedload(TeamMember.team).joinedload(Team.members)
    ).filter(TeamMember.user_id == user_id).first()
