import { useQuery } from "@tanstack/react-query";
import { API_BACKEND_URL, apiFetch } from "@/client/client";
import type { LeaderboardTeam } from "@/types/leaderboard";

export function useLeaderboard() {
    const fetchLeaderboard = async (): Promise<LeaderboardTeam[]> => {
        const res = await apiFetch<LeaderboardTeam[]>(
            `${API_BACKEND_URL}/leaderboard`
        );

        const data = res.data ?? [];

        return data.map((team: LeaderboardTeam) => ({
            team_id: team.team_id,
            team_name: team.team_name,
            total_points: team.total_points,
            solved_problems: team.solved_problems ?? [],
        } as LeaderboardTeam));
    };

    return useQuery({
        queryKey: ["leaderboard"],
        queryFn: fetchLeaderboard,
        refetchInterval: 30000,
    });
}