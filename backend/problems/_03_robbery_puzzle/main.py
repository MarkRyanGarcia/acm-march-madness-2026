import math
from typing import List
from problems.base import Problem, main


class RobberyPuzzle(Problem):
    MAX_X, MAX_Y = 300, 300
    NUM_TUBERS = 4000
    NUM_GUARDS = 1000

    tubers: List[tuple[int, int]]  # (x, y)
    guards: List[tuple[int, int, int]]  # (x, y, direction)
    DIRS = [(0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1)]

    DIR_TO_SYBOL = {0: "^", 2: ">", 4: "v", 6: "<"}

    def __init__(self, seed=0) -> None:
        super().__init__(seed)

        NUM_CLUSTERS = 30
        CLUSTER_RADIUS = 10

        self.tubers, self.guards = [], []
        used = set()

        tubers_per_cluster = self.NUM_TUBERS // NUM_CLUSTERS
        guards_per_cluster = self.NUM_GUARDS // NUM_CLUSTERS

        clusters = []

        for _ in range(NUM_CLUSTERS):
            cx = self.rand.randint(40, self.MAX_X - 40)
            cy = self.rand.randint(40, self.MAX_Y - 40)
            clusters.append((cx, cy))

        for cx, cy in clusters:
            for _ in range(tubers_per_cluster):
                while True:
                    x = cx + self.rand.randint(-CLUSTER_RADIUS, CLUSTER_RADIUS)
                    y = cy + self.rand.randint(-CLUSTER_RADIUS, CLUSTER_RADIUS)

                    if (
                        0 <= x < self.MAX_X
                        and 0 <= y < self.MAX_Y
                        and (x, y) not in used
                    ):
                        break

                used.add((x, y))
                self.tubers.append((x, y))

        for cx, cy in clusters:
            for _ in range(guards_per_cluster):

                while True:
                    angle = self.rand.random() * 2 * math.pi
                    dist = self.rand.randint(15, 20)
                    gx = cx + int(math.cos(angle) * dist)
                    gy = cy + int(math.sin(angle) * dist)

                    if (
                        0 <= gx < self.MAX_X
                        and 0 <= gy < self.MAX_Y
                        and (gx, gy) not in used
                    ):
                        break

                used.add((gx, gy))

                dx, dy = cx - gx, cy - gy

                best_dir = max(
                    range(8), key=lambda d: dx * self.DIRS[d][0] + dy * self.DIRS[d][1]
                )

                init_dir = (((best_dir + 4) % 8) // 2) * 2
                self.guards.append((gx, gy, init_dir))

        while len(self.guards) < self.NUM_GUARDS:

            gx = self.rand.randint(0, self.MAX_X - 1)
            gy = self.rand.randint(0, self.MAX_Y - 1)

            if (gx, gy) in used:
                continue

            used.add((gx, gy))

            dir = self.rand.choice([0, 2, 4, 6])
            self.guards.append((gx, gy, dir))

    def generate_input(self) -> str:
        problem_input = []
        for x, y in self.tubers:
            problem_input.append(f"{x},{y}")

        problem_input.append("")

        for x, y, dir in self.guards:
            problem_input.append(f"{x},{y} {self.DIR_TO_SYBOL[dir]}")

        return "\n".join(problem_input)

    def visible_atan(self, gx: int, gy: int, dir: int, tx: int, ty: int) -> bool:
        dx, dy = tx - gx, ty - gy
        if dx * dx + dy * dy > 100:
            return False

        tuber_angle = math.atan2(dy, dx)
        vx, vy = self.DIRS[dir]
        if dx * vx + dy * vy <= 0:
            return False

        guard_angle = math.atan2(vy, vx)

        diff = abs(tuber_angle - guard_angle)
        diff = min(diff, 2 * math.pi - diff)

        return diff <= math.pi / 4

    def visible_dot(self, gx, gy, dir, tx, ty):
        dx, dy = tx - gx, ty - gy
        dist2 = dx * dx + dy * dy

        if dist2 > 100:
            return False

        vx, vy = self.DIRS[dir]
        dot = dx * vx + dy * vy

        if dot <= 0:
            return False

        mag_v2 = vx * vx + vy * vy

        return dot * dot * 2 >= mag_v2 * dist2

    def find_stealable(self, rot: int) -> int:
        output = 0
        for tx, ty in self.tubers:
            guarded = False
            for gx, gy, dir in self.guards:
                new_dir = (dir + rot) % 8
                if self.visible_atan(gx, gy, new_dir, tx, ty):
                    guarded = True
                    break
            if not guarded:
                output += 1
        return output

    def part1_sln(self) -> int:
        return self.find_stealable(0)

    def part2_sln(self) -> int:
        output = 0

        for rot in range(8):
            output = max(output, self.find_stealable(rot))

        return output


if __name__ == "__main__":
    main(RobberyPuzzle)
