from sqlalchemy.orm import declarative_base

Base = declarative_base()

from .User import User
from .Team import Team
from .TeamMember import TeamMember
from .TeamPoint import TeamPoint
from .TeamSubmitAttempt import TeamSubmitAttempt

__all__ = [
    "User",
    "Team",
    "TeamMember",
    "TeamPoint",
    "TeamSubmitAttempt",
]
