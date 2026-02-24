from datetime import datetime
from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    ForeignKey,
    Text,
    func,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.models import Base


class TeamSubmitAttempt(Base):
    __tablename__ = "team_submit_attempts"

    team_id: Mapped[int] = mapped_column(
        ForeignKey("teams.id", ondelete="CASCADE"), primary_key=True
    )
    problem_id: Mapped[str] = mapped_column(Text, primary_key=True)
    submitted_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), primary_key=True
    )
    answer: Mapped[int] = mapped_column(BigInteger, nullable=False)
    correct: Mapped[bool] = mapped_column(Boolean, nullable=False)
    submitted_by_user_id: Mapped[str] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )

    team = relationship("Team", back_populates="submit_attempts")
    submitter = relationship("User", passive_deletes=True)
