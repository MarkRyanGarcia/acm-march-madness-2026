from typing import List
from pydantic import BaseModel


class LeaderboardEntry(BaseModel):
    team_id: int
    team_name: str
    total_points: float
    solved_problems: List[str]
