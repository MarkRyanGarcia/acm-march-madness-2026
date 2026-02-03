import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type {
  ProblemSubmissionInput,
  ProblemSubmissionResponse,
} from "@/types/problem";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useSubmitProblem(day: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (
      input: ProblemSubmissionInput,
    ): Promise<ProblemSubmissionResponse> =>
      await apiFetch(`${API_BACKEND_URL}/problems/${day}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ part: input.part, answer: input.answer }),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["problem", day] });

      navigate({
        to: "/problems/$day/submission",
        params: { day },
        search: { correct: data.correct },
      });
    },
  });
}
