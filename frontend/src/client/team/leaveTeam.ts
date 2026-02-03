import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useLeaveTeam(clerkUserId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      apiFetch(`${API_BACKEND_URL}/teams/leave`, {
        method: "PATCH",
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTeam", clerkUserId] }),
  });
}
