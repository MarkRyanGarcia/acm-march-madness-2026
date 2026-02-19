import { useQuery } from "@tanstack/react-query";
import type { ProblemListItemResponse, Problems } from "@/types/problem";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useProblemList() {
  const fetchProblemList = async (): Promise<Problems> => {
    const res = await apiFetch<Array<ProblemListItemResponse>>(
      `${API_BACKEND_URL}/problems/`,
    );
    const problemListResponse = res.data;

    const now = new Date();
    let nextRelease: Date | null = null;

    const problemList = problemListResponse.map((problem) => {
      const releaseTime = new Date(problem.release_time);
      if (now < releaseTime && !nextRelease) {
        nextRelease = releaseTime;
      }
      return {
        day: problem.day,
        released: problem.released,
      };
    });

    return {
      problemList,
      nextRelease: nextRelease!,
    };
  };

  return useQuery({
    queryKey: ["problemList"],
    queryFn: fetchProblemList,
  });
}
