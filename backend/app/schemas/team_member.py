from datetime import datetime
from pydantic import BaseModel


class TeamMemberOut(BaseModel):
    user_id: str
    username: str
    is_leader: bool
    joined_at: datetime

    class Config:
        form_attributes = True

