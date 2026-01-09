import { useQuery } from "@tanstack/react-query";
import type { User, UserResponse } from "@/types/user";
import { API_BACKEND_URL, useApiClient } from "@/client/apiClient";

export function useUser(userId: string) {
  const { apiFetch } = useApiClient();

  const fetchUser = async (): Promise<User | null> => {
    const userResponse: UserResponse = await apiFetch(
      `${API_BACKEND_URL}/users/${userId}`,
    );
    if (!userResponse) return null;
    return {
      id: userResponse.id,
      userName: userResponse.username,
      email: userResponse.email,
    };
  };

  return useQuery({
    queryKey: ["user", userId],
    queryFn: fetchUser,
  });
}
