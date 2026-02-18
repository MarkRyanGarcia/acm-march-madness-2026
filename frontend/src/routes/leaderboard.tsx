import { StrokedText } from "@/components/StrokedText";
import { createFileRoute } from "@tanstack/react-router";
import { useLeaderboard } from "@/client/leaderboard/getLeaderboard";

export const Route = createFileRoute("/leaderboard")({
    component: RouteComponent,
});

const sizeClasses = "text-3xl sm:text-5xl md:text-7xl tracking-wider";

function RouteComponent() {
    const { data: leaderboardData = [] } = useLeaderboard();

    return (
        <div className="w-full mx-auto px-4 mt-8 md:mt-20 font-[Fredoka] relative min-h-screen">
            <h1 className="font-extrabold text-center mb-6 md:mb-10">
                <StrokedText text="GARDEN OF GREATNESS" className={sizeClasses} />
            </h1>

            <div className="max-w-5xl mx-auto bg-[#F8EACB]/35 backdrop-blur-xs outline-[#FFE9B8]/90 outline-4 md:outline-15 rounded-3xl md:rounded-4xl overflow-hidden relative z-20">

                <div className="grid grid-cols-2 px-4 md:px-8 py-4 md:py-6 text-grass-400 font-bold text-xl md:text-3xl">
                    <h3 className="text-left">Team</h3>
                    <h3 className="text-right">Points</h3>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 pb-6 px-4 md:px-8">
                    {leaderboardData.map((team, teamIdx) => (
                        <div
                            key={team.team_id}
                            className={`grid grid-cols-2 items-center my-1 md:my-2 px-4 md:px-8 py-3 md:py-5 rounded-2xl md:rounded-4xl outline-white outline-4 md:outline-8 text-white font-bold text-lg md:text-2xl ${teamIdx === 0 ? "bg-gold-100" : "bg-grass-400"
                                }`}
                        >
                            <h3 className="text-left truncate pr-2" title={team.team_name}>
                                {team.team_name}
                            </h3>
                            <h3 className="text-right whitespace-nowrap">
                                {team.total_points.toFixed(2)}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

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