from sqlalchemy.orm import declarative_base

Base = declarative_base()

from .user import User
from .team import Team
from .team_member import TeamMember
from .team_point import TeamPoint
from .team_submit_attempt import TeamSubmitAttempt

__all__ = [
    "User",
    "Team",
    "TeamMember",
    "TeamPoint",
    "TeamSubmitAttempt",
]
