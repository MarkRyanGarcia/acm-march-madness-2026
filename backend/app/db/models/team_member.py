from datetime import datetime
from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Index,
    String,
    func,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import false
from app.db.models import Base


class TeamMember(Base):
    __tablename__ = "team_members"

    team_id: Mapped[int] = mapped_column(
        ForeignKey("teams.id", ondelete="CASCADE"), primary_key=True
    )
    user_id: Mapped[str] = mapped_column(
        String, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    joined_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )
    is_leader: Mapped[bool] = mapped_column(
        Boolean, nullable=False, server_default=false()
    )

    team = relationship("Team", back_populates="members")
    user = relationship("User", back_populates="team_membership")

    __table_args__ = (Index("team_members_user_id_unique", "user_id", unique=True),)
