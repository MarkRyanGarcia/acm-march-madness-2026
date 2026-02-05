import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type {
  ProblemSubmissionInput,
  ProblemSubmissionResponse,
} from "@/types/problem";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useSubmitProblem(day: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (
      input: ProblemSubmissionInput,
    ): Promise<ProblemSubmissionResponse> => {
      const res = await apiFetch<ProblemSubmissionResponse>(
        `${API_BACKEND_URL}/problems/${day}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ part: input.part, answer: input.answer }),
        },
      );

      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);

      navigate({
        to: "/problems/$day/submission",
        params: { day },
        search: { correct: data.correct },
      });
    },
  });
}
