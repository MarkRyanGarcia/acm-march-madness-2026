import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useToggleAcceptingMembers(clerkUserId: string, teamId: number) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const token = await getToken();

      const res = await apiFetch(
        `${API_BACKEND_URL}/teams/${teamId}/toggle-accepting`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to toggle accepting members");
      }

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTeam", clerkUserId] }),
  });
}
