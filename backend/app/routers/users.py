from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.deps.auth import require_clerk_auth
from app.deps.db import get_db
from app.models.models import User
from app.schemas.user import UserCreate, UserRead

router = APIRouter()


@router.post("/hello")
def post_hello(auth=Depends(require_clerk_auth)):
    print(auth)


@router.post("/users", response_model=UserRead)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    existing_user = (
        db.query(User)
        .filter(
            (User.clerk_user_id == user_in.clerk_user_id)
            | (User.username == user_in.username)
        )
        .first()
    )
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(**user_in.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
