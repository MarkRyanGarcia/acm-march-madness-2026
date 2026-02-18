
export type LeaderboardTeam = {
    team_id: number;
    team_name: string;
    total_points: number;
    solved_problems: string[];
};

export type LeaderboardResponse = {
    leaderboard: {
        team_id: number;
        team_name: string;
        total_points: number;
        solved_problems: string[];
    }[];
};