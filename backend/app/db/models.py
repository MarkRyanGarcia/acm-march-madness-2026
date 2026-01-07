from datetime import datetime
from typing import Optional
from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Index,
    String,
    Text,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import false, true
from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True, nullable=False)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[Optional[str]] = mapped_column(String, unique=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )

    team_membership = relationship("TeamMember", back_populates="user")


class Team(Base):
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(primary_key=True)
    team_name: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    invite_code: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
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


class TeamMember(Base):
    __tablename__ = "team_members"

    team_id: Mapped[int] = mapped_column(ForeignKey("teams.id"), primary_key=True)
    user_id: Mapped[str] = mapped_column(
        String, ForeignKey("users.id"), primary_key=True
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


class TeamPoint(Base):
    __tablename__ = "team_points"

    team_id: Mapped[int] = mapped_column(ForeignKey("teams.id"), primary_key=True)
    added_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), primary_key=True
    )
    points: Mapped[float] = mapped_column(Float, nullable=False)
    reason: Mapped[str] = mapped_column(Text, nullable=False)

    team = relationship("Team", back_populates="points")

    __table_args__ = (Index("team_points_team_id_idx", "team_id"),)


class TeamSubmitAttempt(Base):
    __tablename__ = "team_submit_attempts"

    team_id: Mapped[int] = mapped_column(ForeignKey("teams.id"), primary_key=True)
    problem_id: Mapped[str] = mapped_column(Text, primary_key=True)
    submitted_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), primary_key=True
    )
    correct: Mapped[bool] = mapped_column(Boolean, nullable=False)
    submitted_by_user_id: Mapped[str] = mapped_column(
        String, ForeignKey("users.id"), nullable=False
    )

    submitter = relationship("User")
