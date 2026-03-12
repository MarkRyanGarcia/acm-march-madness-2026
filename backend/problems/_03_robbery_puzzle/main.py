import math
from typing import List
from problems.base import Problem, main


class RobberyPuzzle(Problem):
    tubers: List[tuple[int, int]]  # (x, y)
    guards: List[tuple[int, int, int]]  # (x, y, direction)
    DIRS = [(0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1)]
    SYMBOL_TO_DIR = {"^": 0, ">": 2, "v": 4, "<": 6}

    def __init__(self, seed=0) -> None:
        super().__init__(seed)

        with open("problems/_03_robbery_puzzle/sample.txt") as f:
            lines = [line.strip() for line in f]

        self.tubers, self.guards = [], []

        parsing_tubers = 1
        for line in lines:
            if line == "":
                parsing_tubers = 0
                continue

            if parsing_tubers:
                x, y = map(int, line.split(","))
                self.tubers.append((x, y))
            else:
                coord, symbol = line.split(" ")
                x, y = map(int, coord.split(","))
                self.guards.append((x, y, self.SYMBOL_TO_DIR[symbol]))

    def generate_input(self) -> str:
        return ""

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

    def part1_sln(self) -> int:
        output = 0

        for tx, ty in self.tubers:
            guarded = False
            for gx, gy, dir in self.guards:
                if self.visible_atan(gx, gy, dir, tx, ty):
                    guarded = True
                    break
            if not guarded:
                output += 1

        return output

    def part2_sln(self) -> int:
        output = 0

        for rot in range(8):
            stealable = 0
            for tx, ty in self.tubers:
                guarded = False
                for gx, gy, dir in self.guards:
                    new_dir = (dir + rot) % 8
                    if self.visible_atan(gx, gy, new_dir, tx, ty):
                        guarded = True
                        break
                if not guarded:
                    stealable += 1
            output = max(output, stealable)

        return output


if __name__ == "__main__":
    main(RobberyPuzzle)
