from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.db.models import User
from app.schemas.user import UserCreate, UserRead

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/users", response_model=UserRead)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        (User.clerk_user_id == user_in.clerk_user_id) | (User.username == user_in.username)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(**user_in.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

