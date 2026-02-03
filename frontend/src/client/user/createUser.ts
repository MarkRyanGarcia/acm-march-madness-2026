import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserInput, UserResponse } from "@/types/user";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useCreateUser(clerkUserId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UserInput): Promise<UserResponse> =>
      apiFetch<UserResponse>(`${API_BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user", clerkUserId] }),
  });
}
