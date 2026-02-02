import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProblemSubmitInput } from "@/types/problem";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useSubmitProblem(day: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ProblemSubmitInput) =>
      apiFetch(`${API_BACKEND_URL}/problems/${day}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ part: input.part, answer: input.answer }),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["problem", day] }),
  });
}
