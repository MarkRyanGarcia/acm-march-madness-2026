import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BACKEND_URL, useApiClient } from "@/client/apiClient";

export function useToggleAcceptingMembers(clerkUserId: string, teamId: number) {
  const { apiFetch } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      apiFetch(`${API_BACKEND_URL}/teams/${teamId}/toggle-accepting`, {
        method: "PATCH",
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTeam", clerkUserId] }),
  });
}
