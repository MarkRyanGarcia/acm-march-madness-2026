from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.models import TeamMember
from app.deps.db import get_db
from app.deps.auth import require_clerk_auth
from app.schemas.team import TeamCreate, TeamOut
from app.db.mappers.team import team_to_out
from app.utils.join import create_invite_code
import app.db.queries.team as team_queries
from app.db.models import Team

router = APIRouter()


@router.get("/teams/me", response_model=TeamOut | None)
def get_my_team(
    db: Annotated[Session, Depends(get_db)],
    auth_id: Annotated[str, Depends(require_clerk_auth)],
):
    team = team_queries.get_team_for_user(db, auth_id)
    return team_to_out(team) if team else None


@router.post("/teams", response_model=TeamOut)
def create_team(
    team_in: TeamCreate,
    db: Annotated[Session, Depends(get_db)],
    auth_id: Annotated[str, Depends(require_clerk_auth)],
):
    user_id = auth_id
    if team_queries.get_membership(db, user_id):
        raise HTTPException(400, "User already belongs to a team")

    team = Team(
        team_name=team_in.team_name,
        invite_code=create_invite_code(),
        accepting_members=team_in.accepting_members,
    )
    db.add(team)
    db.flush()
    db.add(TeamMember(team_id=team.id, user_id=user_id, is_leader=True))
    db.commit()
    db.refresh(team)

    return team_to_out(team)


@router.post("/teams/join")
def join_team(
    invite_code: str,
    db: Annotated[Session, Depends(get_db)],
    auth_id: Annotated[str, Depends(require_clerk_auth)],
):
    user_id = auth_id
    if team_queries.get_membership(db, user_id):
        raise HTTPException(400, "User already belongs to a team")

    team = team_queries.get_team_by_invite_code(db, invite_code)
    if not team:
        raise HTTPException(404, "Invalid invite code")

    if not team.accepting_members:
        raise HTTPException(403, "Team is not accepting members")

    db.add(TeamMember(team_id=team.id, user_id=user_id, is_leader=False))
    db.commit()

    return {"detail": "Joined team successfully"}


@router.post("/teams/leave")
def leave_team(
    db: Annotated[Session, Depends(get_db)],
    auth_id: Annotated[str, Depends(require_clerk_auth)],
):
    user_id = auth_id
    member = team_queries.get_membership_with_team(db, user_id)
    if not member:
        raise HTTPException(400, "User is not in a team")

    team, was_leader = member.team, member.is_leader

    db.delete(member)
    db.flush()

    remaining = team_queries.get_team_members(db, team.id)
    if not remaining:
        db.delete(team)
    elif was_leader:
        remaining[0].is_leader = True
    db.commit()

    return {"detail": "Left team successfully"}


@router.delete("/teams/{team_id}")
def delete_team(
    team_id: int,
    db: Annotated[Session, Depends(get_db)],
    auth_id: Annotated[str, Depends(require_clerk_auth)],
):
    membership = team_queries.get_membership_for_team(db, team_id, auth_id)
    if not membership or not membership.is_leader:
        raise HTTPException(403, "Only the leader can delete the team")

    team = db.query(Team).filter_by(id=team_id).first()
    if not team:
        raise HTTPException(404, "Team not found")

    db.delete(team)
    db.commit()

    return {"detail": "Team deleted"}
