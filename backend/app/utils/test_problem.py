from app.utils.problem import split_problem_parts


def test_markdown_split():
    content = "# Test\n##Part One\nHello, this should work\n## Part Two\nIf not, I will be sad\n"
    part1, part2 = split_problem_parts(content)

    assert part1 == "# Test\n##Part One\nHello, this should work\n"
    assert part2 == "## Part Two\nIf not, I will be sad\n"
