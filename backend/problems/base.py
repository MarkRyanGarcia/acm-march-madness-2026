# Stolen from https://github.com/acmCSUFDev/march-madness-2024/blob/main/problems/problem_utils.py
#
# Changes: generate_input to return a string that can then be served as a text
# file to the client rather than printing the input

import argparse
import random
from abc import ABC, abstractmethod
from typing import Type


class Problem(ABC):
    rand: random.Random

    def __init__(self, seed=0) -> None:
        self.rand = random.Random(seed)

    @abstractmethod
    def generate_input(self) -> str:
        pass

    @abstractmethod
    def part1_sln(self) -> int:
        pass

    @abstractmethod
    def part2_sln(self) -> int:
        pass


def main(ProblemClass: Type[Problem]) -> None:
    parser = argparse.ArgumentParser(description="Generate input and answers")
    parser.add_argument("--seed", type=int, default=0, help="random seed")
    args = parser.parse_args()

    problem = ProblemClass(args.seed)

    file_contents = problem.generate_input()
    # with open("tmp.txt", "w") as file:
    #     file.write(file_contents)

    print(file_contents)
    print("Part 1 Solution:", problem.part1_sln())
    print("Part 2 Solution:", problem.part2_sln())
