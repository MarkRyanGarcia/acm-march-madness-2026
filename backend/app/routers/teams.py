from typing import Annotated
from clerk_backend_api import RequestState
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.deps.auth import require_clerk_auth
from app.deps.db import get_db
from app.schemas.team import TeamRead


router = APIRouter()


@router.get("/teams/me", response_model=TeamRead)
def get_team(
    db: Annotated[Session, Depends(get_db)],
    auth: Annotated[RequestState, Depends(require_clerk_auth)],
):
    if not auth.payload or not auth.payload.get("sub"):
        raise HTTPException(status_code=401, detail="Unauthorized")

    clerk_user_id: str = auth.payload.get("sub", "")


@router.post("/teams")
def create_team():
    pass
