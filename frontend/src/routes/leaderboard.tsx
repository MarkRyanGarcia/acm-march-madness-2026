import { createFileRoute } from "@tanstack/react-router";
import { StrokedText } from "@/components/StrokedText";
import { useLeaderboard } from "@/client/leaderboard/getLeaderboard";
import { LoadingPage } from "@/components/Loading";
import ErrorPage from "@/components/Error";
import { useUserTeam } from "@/client/team/getUserTeam";

export const Route = createFileRoute("/leaderboard")({
  component: LeaderboardPage,
});

const sizeClasses = "text-3xl sm:text-5xl md:text-7xl tracking-wider";

function LeaderboardPage() {
  const clerkUser = Route.useRouteContext().auth.user;
  const teamQuery = useUserTeam(clerkUser?.id ?? "");
  const { data: leaderboardData = [], isLoading, error } = useLeaderboard();

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  const getEggIcon = (
    solvedProblems: Array<string> | undefined,
    dayIndex: number,
  ) => {
    const hasPart1 = solvedProblems?.includes(`day${dayIndex}/part1`);
    const hasPart2 = solvedProblems?.includes(`day${dayIndex}/part2`);
    if (hasPart1 && hasPart2) return "/golden_egg.svg";
    if (hasPart1) return "/half_egg.svg";
    return "/egg.svg";
  };

  return (
    <div className="w-full mx-auto px-4 mt-8 md:mt-20 font-[Fredoka] relative min-h-screen">
      <h1 className="font-extrabold text-center mb-6 md:mb-10">
        <StrokedText text="GARDEN OF GREATNESS" className={sizeClasses} />
      </h1>

      <div className="max-w-5xl mx-auto bg-[#F8EACB]/35 backdrop-blur-xs outline-[#FFE9B8]/90 outline-4 md:outline-15 rounded-3xl md:rounded-4xl overflow-hidden relative z-20">
        <div className="grid grid-cols-2 px-4 md:px-8 py-4 md:py-6 text-grass-400 font-bold text-xl md:text-3xl">
          <h3 className="text-left">Points & Eggs</h3>
          <h3 className="text-right">Team</h3>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 pb-6 px-4 md:px-8">
          {leaderboardData.map((team) => (
            <div
              key={team.team_id}
              className={`grid grid-cols-[1fr_auto] md:grid-cols-2 items-center my-1 md:my-2 px-4 md:px-8 py-3 md:py-5 rounded-2xl md:rounded-4xl outline-white outline-4 md:outline-8 text-white font-bold text-lg md:text-2xl ${
                teamQuery.data?.teamName === team.team_name
                  ? "bg-blue-300"
                  : "bg-grass-400"
              }`}
            >
              {/* Left Side: Points + Eggs */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 overflow-hidden">
                <span className="shrink-0">{team.total_points.toFixed(2)}</span>
                <div className="flex gap-0.5 md:gap-1.5 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={getEggIcon(team.solved_problems, i + 1)}
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain"
                      alt="egg"
                    />
                  ))}
                </div>
              </div>

              {/* Right Side: Team Name */}
              <h3 className="text-right truncate ml-4" title={team.team_name}>
                {team.team_name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Background Flowers */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="/flower_ixora.svg"
          className="absolute -left-2.5 top-20 md:top-35 w-16 md:w-35 lg:w-50 opacity-50 md:opacity-100"
        />
        <img
          src="/random_flower.svg"
          className="absolute -right-2.5 top-10 md:top-100 w-20 md:w-40 lg:w-48 opacity-50 md:opacity-100"
        />
        <img
          src="/hibiscus1.svg"
          className="absolute -left-2.5 bottom-10 md:top-185 w-20 md:w-40 lg:w-48 -scale-x-100 opacity-50 md:opacity-100"
        />
      </div>
    </div>
  );
}
