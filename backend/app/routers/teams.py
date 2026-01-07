from typing import Annotated
from clerk_backend_api import RequestState
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.db.models import Team, TeamMember
from app.deps.auth import require_clerk_auth
from app.deps.db import get_db
from app.schemas.team import TeamCreate, TeamOut
from app.utils.join import create_invite_code


router = APIRouter()


@router.get("/teams/me", response_model=TeamOut | None)
def get_team(
    db: Annotated[Session, Depends(get_db)],
    auth: Annotated[RequestState, Depends(require_clerk_auth)],
):
    if not auth.payload or not auth.payload.get("sub"):
        raise HTTPException(status_code=401, detail="Unauthorized")

    user_id: str = auth.payload.get("sub", "")
    team_member = db.query(TeamMember).filter(TeamMember.user_id == user_id).first()
    if not team_member:
        return None

    team = (
        db.query(Team)
        .options(joinedload(Team.members).joinedload(TeamMember.user))
        .filter(Team.id == team_member.team_id)
        .first()
    )
    return team


@router.post("/teams", response_model=TeamOut)
def create_team(
    team_in: TeamCreate,
    db: Annotated[Session, Depends(get_db)],
    auth: Annotated[RequestState, Depends(require_clerk_auth)],
):
    if not auth.payload or not auth.payload.get("sub"):
        raise HTTPException(status_code=401, detail="Unauthorized")

    user_id: str = auth.payload.get("sub", "")
    if user_id == "":
        raise HTTPException(status_code=400, detail="User id not provided in payload")

    invite_code = create_invite_code()

    team = Team(
        team_name=team_in.team_name,
        invite_code=invite_code,
        accepting_members=team_in.accepting_members,
    )
    db.add(team)
    db.commit()
    db.refresh(team)

    member = TeamMember(team_id=team.id, user_id=user_id, is_leader=True)
    db.add(member)
    db.commit()

    team = (
        db.query(Team)
        .options(joinedload(Team.members).joinedload(TeamMember.user))
        .filter(Team.id == team.id)
        .first()
    )
    return team
