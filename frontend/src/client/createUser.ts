import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BACKEND_URL, useApiClient } from "./apiClient";
import type { UserInput, UserResponse } from "@/types/user";

export function useCreateUser(clerkUserId: string) {
  const { apiFetch } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UserInput): Promise<UserResponse> =>
      apiFetch<UserResponse>(`${API_BACKEND_URL}/users`, {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: (createdUser) =>
      queryClient.setQueryData(["user", clerkUserId], createdUser),
  });
}
