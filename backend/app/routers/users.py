from typing import Annotated
from clerk_backend_api import RequestState
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.deps.auth import require_clerk_auth
from app.deps.db import get_db
from app.models.models import User
from app.schemas.user import UserCreate, UserRead

router = APIRouter()


@router.get("/users/{clerk_user_id}", response_model=UserRead | None)
def get_user_by_clerk_id(
    clerk_user_id: str,
    db: Annotated[Session, Depends(get_db)],
    auth: Annotated[RequestState, Depends(require_clerk_auth)],
):
    if not auth.payload or auth.payload.get("sub") != clerk_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    return db.query(User).filter(User.clerk_user_id == clerk_user_id).first()


@router.post("/users", response_model=UserRead)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    existing_user = (
        db.query(User).filter((User.clerk_user_id == user_in.clerk_user_id)).first()
    )
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(**user_in.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
