import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useDeleteTeam(clerkUserId: string, teamId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      apiFetch(`${API_BACKEND_URL}/teams/${teamId}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTeam", clerkUserId] }),
  });
}
