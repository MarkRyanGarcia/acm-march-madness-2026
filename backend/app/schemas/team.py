from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


class TeamCreate(BaseModel):
    team_name: str
    accepting_members: Optional[bool] = True


class TeamMemberOut(BaseModel):
    id: str
    username: str
    is_leader: bool
    joined_at: datetime

    class Config:
        form_attributes = True


class TeamOut(BaseModel):
    id: int
    team_name: str
    invite_code: str
    accepting_members: bool
    members: List[TeamMemberOut]

    class Config:
        form_attributes = True
