from app.utils.problem import calculate_submission_score_h, split_problem_parts


def test_markdown_split():
    content = "# Test\n##Part One\nHello, this should work\n## Part Two\nIf not, I will be sad\n"
    part1, part2 = split_problem_parts(content)

    assert part1 == "# Test\n##Part One\nHello, this should work\n"
    assert part2 == "## Part Two\nIf not, I will be sad\n"


def test_calculate_score_h():
    assert calculate_submission_score_h(max_points=100, h=0.0) == 100.0
    assert 50 < calculate_submission_score_h(max_points=100, h=10.0) < 100
    assert calculate_submission_score_h(max_points=100, h=24.0) == 50.0

    assert calculate_submission_score_h(max_points=50, h=0.0) == 50.0
    assert calculate_submission_score_h(max_points=50, h=24.0) == 25.0
