from typing import List
from problems.base import Problem, main


class FuelingUp(Problem):
    max_weight: int = 10
    weights: List[int] = [2, 3, 4, 5, 6]
    energy: List[int] = [3, 5, 9, 10, 13]

    def __init__(self, seed=0) -> None:
        super().__init__(seed)

    def generate_input(self) -> str:
        return ""

    def part1_sln(self) -> int:
        return 0

    def part2_sln(self) -> int:
        return 0


if __name__ == "__main__":
    main(FuelingUp)
