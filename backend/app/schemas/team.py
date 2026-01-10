from typing import List, Optional
from pydantic import BaseModel
from app.schemas import TeamMemberOut


class TeamCreate(BaseModel):
    team_name: str
    accepting_members: Optional[bool] = True


class TeamOut(BaseModel):
    id: int
    team_name: str
    invite_code: str
    accepting_members: bool
    members: List[TeamMemberOut]

    class Config:
        form_attributes = True
