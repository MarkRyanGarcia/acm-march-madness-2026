from typing import List
from problems.problem_base import Problem, main


class MathHomework(Problem):
    INPUT_LEN = 10_000
    numbers: List[int] = []

    def __init__(self, seed=0) -> None:
        super().__init__(seed)

        self.numbers = [
            self.rand.randint(10_000, 99_999) for _ in range(self.INPUT_LEN)
        ]

    def generate_input(self) -> str:
        return "\n".join([str(num) for num in self.numbers])

    def part1_sln(self) -> int:
        return sum(self.numbers)

    def part2_sln(self) -> int:
        odd_sum = even_sum = 0
        for num in self.numbers:
            if num % 2:
                odd_sum += num
            else:
                even_sum += num
        return odd_sum * even_sum


if __name__ == "__main__":
    main(MathHomework)
