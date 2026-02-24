import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ErrorResponse } from "@/types/response";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

type JoinTeamInput = {
  invite_code: string;
};

export function useJoinTeam(clerkUserId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: JoinTeamInput) => {
      const res = await apiFetch(
        `${API_BACKEND_URL}/teams/join?invite_code=${input.invite_code}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        },
      );
      console.log(res.data);
      if ([403, 404].includes(res.status)) {
        throw new Error((res.data as ErrorResponse).detail);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTeam", clerkUserId] }),
  });
}
