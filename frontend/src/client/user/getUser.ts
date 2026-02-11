import { useQuery } from "@tanstack/react-query";
import type { User, UserResponse } from "@/types/user";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useUser(userId: string) {
  const fetchUser = async (): Promise<User | null> => {
    const res = await apiFetch<UserResponse>(
      `${API_BACKEND_URL}/users/${userId}`,
    );
    const userResponse = res.data;
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
