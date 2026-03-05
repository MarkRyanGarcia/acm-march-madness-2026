import heapq
from collections import deque
from typing import List
from problems.base import Problem, main


class TheClimb(Problem):
    ROWS, COLS = 400, 200
    grid: List[List[str]]

    def __init__(self, seed=0) -> None:
        super().__init__(seed % 20)

        self.grid = [["."] * self.COLS for _ in range(self.ROWS)]
        for r in range(self.ROWS):
            for c in range(self.COLS):
                if self.rand.random() > 0.875:
                    self.grid[r][c] = "#"

    def generate_input(self) -> str:
        return "\n".join(["".join(line) for line in self.grid])

    def offsets(self) -> list[tuple[int, int]]:
        offsets = []
        for dr in range(-4, 1):
            for dc in range(-4, 5):
                if dr == 0 and dc == 0:
                    continue
                if abs(dr) + abs(dc) <= 4:
                    offsets.append((dr, dc))
        return offsets

    def part1_sln(self) -> int:
        seen = [[False] * (self.COLS) for _ in range(self.ROWS)]
        q = deque()
        for c in range(self.COLS):
            if self.grid[self.ROWS - 1][c] == "#":
                q.append((self.ROWS - 1, c, 0))
                seen[self.ROWS - 1][c] = True

        while q:
            r, c, dist = q.popleft()
            if r == 0:
                return dist

            for dr, dc in self.offsets():
                nr, nc = r + dr, c + dc
                if min(nr, nc) < 0 or nc < 0 or nr >= self.ROWS or nc >= self.COLS:
                    continue
                if not seen[nr][nc] and self.grid[nr][nc] == "#":
                    q.append((nr, nc, dist + 1))
                    seen[nr][nc] = True

        return -1

    def part2_sln(self) -> int:
        seen = [[False] * (self.COLS) for _ in range(self.ROWS)]
        dist = [[float("inf")] * self.COLS for _ in range(self.ROWS)]
        pq = []

        for c in range(self.COLS):
            if self.grid[self.ROWS - 1][c] == "#":
                heapq.heappush(pq, (0, self.ROWS - 1, c))
                seen[self.ROWS - 1][c] = True

        while pq:
            d, r, c = heapq.heappop(pq)
            if r == 0:
                return d
            if d > dist[r][c]:
                continue

            for dr, dc in self.offsets():
                nr, nc = r + dr, c + dc
                if min(nr, nc) < 0 or nc < 0 or nr >= self.ROWS or nc >= self.COLS:
                    continue
                if self.grid[nr][nc] != "#":
                    continue

                nd = d + abs(nc - c) + abs(nr - r) ** 2
                if nd < dist[nr][nc]:
                    dist[nr][nc] = nd
                    heapq.heappush(pq, (nd, nr, nc))

        return -1


if __name__ == "__main__":
    main(TheClimb)
