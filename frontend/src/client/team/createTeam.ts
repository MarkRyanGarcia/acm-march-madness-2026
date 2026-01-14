import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TeamInput, TeamResponse } from "@/types/team";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useCreateTeam(clerkUserId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: TeamInput): Promise<TeamResponse> =>
      apiFetch<TeamResponse>(`${API_BACKEND_URL}/teams`, {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTeam", clerkUserId] }),
  });
}
