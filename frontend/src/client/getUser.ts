import { useQuery } from "@tanstack/react-query";
import { API_BACKEND_URL, useApiClient } from "./apiClient";
import type { User, UserResponse } from "@/types/user";

export function useUser(clerkUserId: string) {
  const { apiFetch } = useApiClient();

  const fetchUser = async (): Promise<User | null> => {
    const userResponse: UserResponse = await apiFetch(
      `${API_BACKEND_URL}/users/${clerkUserId}`,
    );
    if (!userResponse) return null;
    return {
      id: userResponse.id,
      userName: userResponse.username,
      email: userResponse.email,
    };
  };

  return useQuery({
    queryKey: ["user", clerkUserId],
    queryFn: fetchUser,
  });
}
