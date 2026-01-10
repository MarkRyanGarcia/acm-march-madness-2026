import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BACKEND_URL, useApiClient } from "@/client/apiClient";

type JoinTeamInput = {
  invite_code: string;
};

export function useJoinTeam(clerkUserId: string) {
  const { apiFetch } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: JoinTeamInput) =>
      apiFetch(
        `${API_BACKEND_URL}/teams/join?invite_code=${input.invite_code}`,
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTeam", clerkUserId] }),
  });
}
