import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import type { TeamInput, TeamResponse } from "@/types/team";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useCreateTeam(clerkUserId: string) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (input: TeamInput): Promise<TeamResponse> => {
      const token = await getToken();

      const res = await apiFetch<TeamResponse>(`${API_BACKEND_URL}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error("Failed to create team");
      }

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTeam", clerkUserId] }),
  });
}