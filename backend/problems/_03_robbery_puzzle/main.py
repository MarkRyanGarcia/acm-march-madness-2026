import math
from typing import List
from problems.base import Problem, main


class RobberyPuzzle(Problem):
    tubers: List[tuple[int, int]]  # (r, c)
    guards: List[tuple[int, int, int]]  # (r, c, direction)
    DIRS = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1)]
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
                r, c = map(int, line.split(","))
                self.tubers.append((r, c))
            else:
                coord, symbol = line.split(" ")
                r, c = map(int, coord.split(","))
                self.guards.append((r, c, self.SYMBOL_TO_DIR[symbol]))

    def generate_input(self) -> str:
        return ""

    def visible_atan(self, gr: int, gc: int, dir: int, tr: int, tc: int) -> bool:
        dr = tr - gr
        dc = tc - gc

        if dr * dr + dc * dc > 100:
            return False

        tuber_angle = math.atan2(-dr, dc)

        vr, vc = self.DIRS[dir]
        guard_angle = math.atan2(-vr, vc)

        diff = abs(tuber_angle - guard_angle)
        diff = min(diff, 2 * math.pi - diff)

        return diff <= math.pi / 4

    def part1_sln(self) -> int:
        output = 0

        for tr, tc in self.tubers:
            guarded = False
            for gr, gc, dir in self.guards:
                if self.visible_atan(gr, gc, dir, tr, tc):
                    guarded = True
                    break
            if not guarded:
                output += 1

        return output

    def part2_sln(self) -> int:
        output = 0

        for rot in range(8):
            stealable = 0
            for tr, tc in self.tubers:
                guarded = False
                for gr, gc, dir in self.guards:
                    new_dir = (dir + rot) % 8
                    if self.visible_atan(gr, gc, new_dir, tr, tc):
                        guarded = True
                        break
                if not guarded:
                    stealable += 1
            output = max(output, stealable)

        return output


if __name__ == "__main__":
    main(RobberyPuzzle)
