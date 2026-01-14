from typing import Optional
from pydantic import BaseModel


class ProblemOut(BaseModel):
    part1: str
    part2: str

    part1_answer: Optional[int]
    part2_answer: Optional[int]
