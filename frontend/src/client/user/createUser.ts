import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import type { UserInput, UserResponse } from "@/types/user";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useCreateUser(clerkUserId: string | null) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (input: UserInput): Promise<UserResponse> => {
      if (!clerkUserId) throw new Error("No Clerk user ID provided");

      const token = await getToken();

      const res = await apiFetch<UserResponse>(`${API_BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user", clerkUserId] }),
  });
}