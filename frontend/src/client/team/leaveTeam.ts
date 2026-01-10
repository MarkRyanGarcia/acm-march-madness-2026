import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BACKEND_URL, useApiClient } from "@/client/apiClient";

export function useLeaveTeam(clerkUserId: string) {
  const { apiFetch } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      apiFetch(`${API_BACKEND_URL}/teams/leave`, {
        method: "POST",
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTeam", clerkUserId] }),
  });
}
