import { useQuery } from "@tanstack/react-query";
import type { LeaderboardTeam } from "@/types/leaderboard";
import { API_BACKEND_URL, apiFetch } from "@/client/client";

export function useLeaderboard() {
  const fetchLeaderboard = async (): Promise<Array<LeaderboardTeam>> => {
    const res = await apiFetch<Array<LeaderboardTeam>>(
      `${API_BACKEND_URL}/leaderboard`,
    );

    const leaderboardResponse = res.data;
    return leaderboardResponse.map(
      (team: LeaderboardTeam) =>
        ({
          team_id: team.team_id,
          team_name: team.team_name,
          total_points: team.total_points,
          solved_problems: team.solved_problems ?? [],
        }) as LeaderboardTeam,
    );
  };

  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    refetchInterval: 30000,
  });
}
