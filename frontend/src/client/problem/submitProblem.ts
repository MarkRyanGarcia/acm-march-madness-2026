import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";
import type {
  ProblemSubmission,
  ProblemSubmissionInput,
  ProblemSubmissionResponse,
} from "@/types/problem";
import { API_BACKEND_URL, apiFetch } from "@/client/client";
import { SUBMIT_REDIRECT_KEY } from "@/constants/localStorage";

export function useSubmitProblem(day: string) {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (
      input: ProblemSubmissionInput,
    ): Promise<ProblemSubmission> => {
      const token = await getToken();

      const res = await apiFetch<ProblemSubmissionResponse>(
        `${API_BACKEND_URL}/problems/${day}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ part: input.part, answer: input.answer }),
        },
      );

      if (!res.ok) {
        throw new Error(typeof res.data?.error === 'string' ? res.data.error : "Failed to submit problem");
      }

      const submissionData = res.data;

      return {
        correct: submissionData.correct ?? false,
        error: submissionData.error,
        cooldownUntil: submissionData.cooldown_until,
        remainingCooldownSeconds: submissionData.remaining_cooldown_seconds,
      };
    },
    onSuccess: (data) => {
      localStorage.setItem(SUBMIT_REDIRECT_KEY, JSON.stringify(data));
      navigate({ to: "/problems/$day/submission", params: { day } });
    },
  });
}