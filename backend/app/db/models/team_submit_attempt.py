from datetime import datetime
from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    String,
    Text,
    func,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.models import Base

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

