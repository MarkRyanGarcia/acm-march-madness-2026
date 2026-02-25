import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import type { Team, TeamResponse } from "@/types/team";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useUserTeam(userId: string | null) {
  const { getToken } = useAuth();

  const fetchUserTeam = async (): Promise<Team | null> => {
    if (!userId) return null;

    const token = await getToken();

    const res = await apiFetch<TeamResponse>(`${API_BACKEND_URL}/teams/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok || !res.data) return null;

    const teamResponse = res.data;

    return {
      id: teamResponse.id,
      teamName: teamResponse.team_name,
      inviteCode: teamResponse.invite_code,
      acceptingMembers: teamResponse.accepting_members,
      members: teamResponse.members.map((member) => ({
        id: member.user_id,
        userName: member.username,
        isLeader: member.is_leader,
        joinedAt: member.joined_at,
      })),
    };
  };

  return useQuery({
    queryKey: ["userTeam", userId],
    queryFn: fetchUserTeam,
    enabled: !!userId,
  });
}