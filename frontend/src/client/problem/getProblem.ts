import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import type { Problem, ProblemResponse } from "@/types/problem";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useProblem(day: string) {
  const { getToken } = useAuth();

  const fetchProblem = async (): Promise<Problem> => {
    const token = await getToken();

    const res = await apiFetch<ProblemResponse>(
      `${API_BACKEND_URL}/problems/${day}`,
      { headers: { Authorization: `Bearer ${token || ''}` } }
    );

    if (!res.ok) {
      if (res.status === 404) throw new Error("Not Found");
      throw new Error("Failed to fetch problem");
    }

    const problemResponse = res.data;

    return {
      signedIn: true,
      canSubmit: problemResponse.can_submit,
      part1: problemResponse.part1,
      part2: problemResponse.part2,
      part1Answer: problemResponse.part1_answer,
      part2Answer: problemResponse.part2_answer,
    };
  };

  return useQuery({
    queryKey: ["problem", day],
    queryFn: fetchProblem,
    retry: false,
  });
}