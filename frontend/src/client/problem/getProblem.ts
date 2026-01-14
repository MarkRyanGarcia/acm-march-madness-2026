import { useQuery } from "@tanstack/react-query";
import type { Problem, ProblemResponse } from "@/types/problem";
import { API_BACKEND_URL, useApiClient } from "@/client/apiClient";

export function useProblem(day: string) {
  const { apiFetch } = useApiClient();

  const fetchProblem = async (): Promise<Problem> => {
    const problemResponse: ProblemResponse = await apiFetch(
      `${API_BACKEND_URL}/problems/${day}`,
      { auth: false },
    );

    const problem: Problem = {
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
