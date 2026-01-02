from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    clerk_user_id: str
    username: str
    email: Optional[EmailStr] = None


class UserRead(BaseModel):
    id: int
    clerk_user_id: str
    username: str
    email: Optional[EmailStr] = None
    created_at: datetime

    class Config:
        orm_mode = True  # Allows returning SQLAlchemy model instances directly
