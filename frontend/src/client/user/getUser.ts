import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import type { User, UserResponse } from "@/types/user";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useUser(userId: string | null) {
  const { getToken } = useAuth();

  const fetchUser = async (): Promise<User | null> => {
    if (!userId) return null;

    const token = await getToken();

    const res = await apiFetch<UserResponse>(
      `${API_BACKEND_URL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok || !res.data) return null;

    const userResponse = res.data;
    return {
      id: userResponse.id,
      userName: userResponse.username,
      email: userResponse.email,
    };
  };

  return useQuery({
    queryKey: ["user", userId],
    queryFn: fetchUser,
    enabled: !!userId,
  });
}
