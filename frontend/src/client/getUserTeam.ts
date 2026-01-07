import { useQuery } from "@tanstack/react-query";
import { API_BACKEND_URL, useApiClient } from "./apiClient";
import type { Team, TeamResponse } from "@/types/team";

export function useUserTeam(userId: string | null) {
  const { apiFetch } = useApiClient();

  const fetchUserTeam = async (): Promise<Team | null> => {
    const teamResponse: TeamResponse = await apiFetch(`${API_BACKEND_URL}/teams/me`);
    if (!teamResponse) return null;

    const team: Team = {
      id: teamResponse.id,
      teamName: teamResponse.team_name,
      inviteCode: teamResponse.invite_code,
      acceptingMembers: teamResponse.accepting_members,
      members: teamResponse.members.map(member => ({
        id: member.id,
        userName: member.username,
        isLeader: member.is_leader,
        joinedAt: member.joined_at
      }))
    }

    return team;
  }

  return useQuery({
    queryKey: ['team', userId],
    queryFn: fetchUserTeam,
    enabled: !!userId
  })
}
