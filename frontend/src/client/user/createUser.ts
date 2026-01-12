import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserInput, UserResponse } from "@/types/user";
import { API_BACKEND_URL, useApiClient } from "@/client/apiClient";

export function useCreateUser(clerkUserId: string) {
  const { apiFetch } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UserInput): Promise<UserResponse> =>
      apiFetch<UserResponse>(`${API_BACKEND_URL}/users`, {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user", clerkUserId] }),
  });
}
