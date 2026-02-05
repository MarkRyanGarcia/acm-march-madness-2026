import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TeamInput, TeamResponse } from "@/types/team";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useCreateTeam(clerkUserId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: TeamInput): Promise<TeamResponse> => {
      const res = await apiFetch<TeamResponse>(`${API_BACKEND_URL}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTeam", clerkUserId] }),
  });
}
