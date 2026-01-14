import re
from typing import Tuple


def split_problem_parts(content: str) -> Tuple[str, str]:
    """
    Splits the string into part1 (including title), and part 2 with the rest
    """
    parts = re.split(r"(?m)(?=^## Part Two$)", content, maxsplit=1)
    if len(parts) != 2:
        raise ValueError("Content does not contain '## Part Two' heading")

    return parts[0], parts[1]
