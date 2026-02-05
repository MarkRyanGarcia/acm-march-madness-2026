import { useQuery } from "@tanstack/react-query";
import type { Team, TeamResponse } from "@/types/team";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useUserTeam(userId: string | null) {
  const fetchUserTeam = async (): Promise<Team | null> => {
    const res = await apiFetch<TeamResponse>(`${API_BACKEND_URL}/teams/me`);
    const teamResponse = res.data;
    if (!teamResponse) return null;

    const team: Team = {
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

    return team;
  };

  return useQuery({
    queryKey: ["userTeam", userId],
    queryFn: fetchUserTeam,
  });
}
