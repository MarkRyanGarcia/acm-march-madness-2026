from typing import List
from problems.base import Problem, main


class FruitMachine(Problem):
    INPUT_LEN = 500
    K = 10
    M = 100
    numbers: List[int] = []

    def __init__(self, seed=0) -> None:
        super().__init__(seed)

        self.numbers = [self.rand.randint(1, 10_000) for _ in range(self.INPUT_LEN)]

    def generate_input(self) -> str:
        return "\n".join([str(num) for num in self.numbers])

    def part1_sln(self) -> int:
        """
        Calculates 'Pressure Spikes' using a sliding window of size K.
        A spike occurs if current_max - previous_max >= 10.
        """
        n = len(self.numbers)
        if n < self.K:
            return 0

        window_maxes = []

        for i in range(n - self.K + 1):
            current_window = self.numbers[i : i + self.K]
            window_maxes.append(max(current_window))

        spikes = 0

        for j in range(1, len(window_maxes)):
            if window_maxes[j] - window_maxes[j - 1] >= 10:
                spikes += 1

        return spikes

    def part2_sln(self) -> int:
        """
        Simulates the Density Buffer (Monotonic Queue) with a capacity of M.
        Returns the Ignition Code (First + Middle + Last concatenated).
        """
        buffer = []

        for x in self.numbers:

            if len(buffer) == self.M:
                buffer.pop(0)

            while buffer and buffer[-1] < x:
                buffer.pop()

            buffer.append(x)

        if not buffer:
            return 0

        first = buffer[0]
        mid = buffer[len(buffer) // 2]
        last = buffer[-1]

        ignition_code = str(first) + str(mid) + str(last)
        return int(ignition_code)


if __name__ == "__main__":
    main(FruitMachine)
