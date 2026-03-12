import math
from typing import List
from problems.base import Problem, main


class RobberyPuzzle(Problem):
    MAX_X, MAX_Y = 500, 500
    NUM_TUBERS = 6000
    NUM_GUARDS = 1500

    tubers: List[tuple[int, int]]  # (x, y)
    guards: List[tuple[int, int, int]]  # (x, y, direction)
    DIRS = [(0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1)]

    DIR_TO_SYBOL = {0: "^", 2: ">", 4: "v", 6: "<"}

    def __init__(self, seed=0) -> None:
        super().__init__(seed)

        coords = [(x, y) for x in range(self.MAX_X) for y in range(self.MAX_Y)]
        self.rand.shuffle(coords)

        self.tubers = coords[: self.NUM_TUBERS]
        self.guards = []

        for i in range(self.NUM_TUBERS, self.NUM_TUBERS + self.NUM_GUARDS):
            x, y = coords[i]
            self.guards.append((x, y, self.rand.choice([0, 2, 4, 6])))

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
