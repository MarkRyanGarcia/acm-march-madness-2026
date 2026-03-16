from typing import List
from problems.base import Problem, main


class MuddyArrival(Problem):
    INPUT_LEN = 500
    numbers: List[int] = []

    def __init__(self, seed=0) -> None:
        super().__init__(seed)
        self.numbers = [self.rand.randint(1, 10_000) for _ in range(self.INPUT_LEN)]

    def generate_input(self) -> str:
        return "\n".join([str(num) for num in self.numbers])

    def part1_sln(self) -> int:
        n = len(self.numbers)
        result = [-1] * n
        stack = []

        for i in range(n):
            while stack and self.numbers[i] > self.numbers[stack[-1]]:
                index = stack.pop()
                result[index] = self.numbers[i]
            stack.append(i)

        return sum(val for val in result if val != -1)

    def part2_sln(self) -> int:
        n = len(self.numbers)
        spans = [0] * n
        stack = []

        total_stability = 0

        for height in self.numbers:
            current_span = 1
            while stack and stack[-1][0] <= height:
                current_span += stack.pop()[1]

            stack.append((height, current_span))
            total_stability += current_span

        return total_stability


if __name__ == "__main__":
    main(MuddyArrival)
