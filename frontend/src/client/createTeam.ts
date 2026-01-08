import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BACKEND_URL, useApiClient } from "./apiClient";
import type { TeamInput, TeamResponse } from "@/types/team";

export function useCreateTeam(clerkUserId: string) {
  const { apiFetch } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: TeamInput): Promise<TeamResponse> =>
      apiFetch<TeamResponse>(`${API_BACKEND_URL}/teams`, {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: (createdUser) =>
      queryClient.setQueryData(["team", clerkUserId], createdUser),
  });
}
