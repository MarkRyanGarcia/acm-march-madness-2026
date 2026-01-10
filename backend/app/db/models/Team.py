from datetime import datetime
from sqlalchemy import Boolean, DateTime, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import true
from app.db.models import Base

class Team(Base):
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(primary_key=True)
    team_name: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    invite_code: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    accepting_members: Mapped[bool] = mapped_column(
        Boolean, nullable=False, server_default=true()
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )

    members = relationship(
        "TeamMember", back_populates="team", cascade="all, delete-orphan"
    )
    points = relationship(
        "TeamPoint", back_populates="team", cascade="all, delete-orphan"
    )
