from datetime import datetime
from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Index,
    Text,
    func,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.models import Base


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