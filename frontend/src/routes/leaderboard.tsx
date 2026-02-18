import { StrokedText } from "@/components/StrokedText";
import { createFileRoute } from "@tanstack/react-router";
import { useLeaderboard } from "@/client/leaderboard/getLeaderboard";

export const Route = createFileRoute("/leaderboard")({
    component: RouteComponent,
});

const sizeClasses = "text-5xl md:text-8xl tracking-wider";

function RouteComponent() {
    const { data: leaderboardData = [] } = useLeaderboard();

    return (
        <div className="max-w-5xl mx-auto px-4 mt-12 md:mt-20 font-[Fredoka]">
            <h1 className="font-extrabold text-center mb-10">
                <StrokedText
                    text="GARDEN OF GREATNESS"
                    className={sizeClasses}
                />
            </h1>

            <div className="w-full bg-[#F8EACB] outline-[#FFE9B8] outline-10 md:outline-15 rounded-4xl overflow-hidden">

                <div className="grid grid-cols-2 px-8 py-6 text-grass-400 font-bold text-3xl">
                    <h3 className="text-left">Team</h3>
                    <h3 className="text-right">Points</h3>
                </div>


                <div className="flex flex-col gap-4 pb-6">
                    {leaderboardData.map((team, teamIdx) => (
                        <div
                            key={team.team_id}
                            className={`grid grid-cols-2 items-center mx-4 my-2 px-8 py-5 rounded-4xl outline-white outline-8 text-white font-bold text-2xl ${teamIdx === 0 ? "bg-gold-100" : "bg-grass-400"}`}
                        >
                            <h3 className="text-left">{team.team_name}</h3>
                            <h3 className="text-right">
                                {team.total_points.toFixed(2)}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}