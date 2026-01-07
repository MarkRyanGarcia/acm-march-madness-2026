from typing import Optional
from pydantic import BaseModel


class TeamCreate(BaseModel):
    team_name: str
    accepting_members: Optional[bool] = True


class TeamRead(BaseModel):
    id: int
    team_name: str
    invite_code: str
    accepting_members: bool

    class Config:
        form_attributes = True
