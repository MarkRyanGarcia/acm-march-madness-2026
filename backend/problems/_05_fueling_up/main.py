from typing import List, Tuple
from problems.base import Problem, main


class FuelingUp(Problem):
    def __init__(self, seed=0) -> None:
        super().__init__(seed)
        self.target_weight = 5000
        self.fruits: List[Tuple[str, int, int]] = []

        # Helper to generate A, B, C... AA, AB...
        def get_alphabetical_id(n: int) -> str:
            result = ""
            while n >= 0:
                result = chr(65 + (n % 26)) + result
                n = (n // 26) - 1
            return result

        # --- 1. BUILD A GUARANTEED POOL ---
        raw_fruits = []
        current_sum = 0
        session_max_weight = self.rand.randint(22, 30)

        # Build the Golden Path
        while current_sum < self.target_weight:
            remaining = self.target_weight - current_sum
            weight = (
                remaining
                if remaining <= session_max_weight
                else self.rand.randint(10, session_max_weight)
            )
            energy = self.rand.randint(500, 1000)
            raw_fruits.append((weight, energy))
            current_sum += weight

        # Add Distractors
        for _ in range(100):
            weight = self.rand.randint(10, session_max_weight)
            energy = self.rand.randint(50, 1200)
            raw_fruits.append((weight, energy))

        # --- 2. ASSIGN ALPHABETICAL IDS ---
        # We assign IDs before shuffling so they are consistent, then shuffle the list
        for i, (w, e) in enumerate(raw_fruits):
            self.fruits.append((get_alphabetical_id(i), w, e))

        self.rand.shuffle(self.fruits)

    def generate_input(self) -> str:
        lines = ["Fruit ID | Weight (lbs) | Energy Value"]
        for id, weight, energy in self.fruits:
            lines.append(f"{id} {weight} {energy}")
        return "\n".join(lines)

    def part1_sln(self) -> int:
        dp = [-1] * (self.target_weight + 1)
        dp[0] = 0
        for _, weight, energy in self.fruits:
            for w in range(self.target_weight, weight - 1, -1):
                if dp[w - weight] != -1:
                    new_energy = dp[w - weight] + energy
                    if new_energy > dp[w]:
                        dp[w] = new_energy
        return max(0, dp[self.target_weight])

    def part2_sln(self) -> int:
        dp = [float("inf")] * (self.target_weight + 1)
        dp[0] = 0

        unique_weights = sorted(list(set(f[1] for f in self.fruits)))

        for weight in unique_weights:
            for w in range(weight, self.target_weight + 1):
                if dp[w - weight] != float("inf"):
                    new_count = dp[w - weight] + 1
                    if new_count < dp[w]:
                        dp[w] = new_count

        result = dp[self.target_weight]
        return int(result) if result != float("inf") else -1


if __name__ == "__main__":
    main(FuelingUp)
