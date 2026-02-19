import { useQuery } from "@tanstack/react-query";
import type { Problem, ProblemResponse } from "@/types/problem";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useProblem(day: string) {
  const fetchProblem = async (): Promise<Problem> => {
    const res = await apiFetch<ProblemResponse>(
      `${API_BACKEND_URL}/problems/${day}`,
    );
    const problemResponse = res.data;

    const problem: Problem = {
      signedIn: problemResponse.is_signed_in,
      canSubmit: problemResponse.can_submit,
      part1: problemResponse.part1,
      part2: problemResponse.part2,
      part1Answer: problemResponse.part1_answer,
      part2Answer: problemResponse.part2_answer,
    };

    return problem;
  };

  return useQuery({
    queryKey: ["problem", day],
    queryFn: fetchProblem,
  });
}
