import { createFileRoute, redirect } from "@tanstack/react-router";
import type { Team } from "@/types/team";
import { CreateUserForm } from "@/components/CreateUser";
import { useUser } from "@/client/user/getUser";
import { useUserTeam } from "@/client/team/getUserTeam";
import { CreateTeamForm } from "@/components/CreateTeam";
import { useLeaveTeam } from "@/client/team/leaveTeam";
import { useDeleteTeam } from "@/client/team/deleteTeam";
import { useToggleAcceptingMembers } from "@/client/team/toggleAccepting";
import { StrokedText } from "@/components/StrokedText";
import { timeAgo } from "@/utils/date";
import { LoadingPage } from "@/components/Loading";
import ErrorPage from "@/components/Error";

export const Route = createFileRoute("/team")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isSignedIn) {
      throw redirect({ to: "/" });
    }
  },
  component: TeamPage,
});

const TeamView: React.FC<{ team: Team; userId: string }> = ({
  team,
  userId,
}) => {
  const leaveTeam = useLeaveTeam(userId);
  const deleteTeam = useDeleteTeam(userId, team.id);
  const toggleAcceptingMembers = useToggleAcceptingMembers(userId, team.id);

  const isLeader = team.members.find(
    (member) => userId === member.id,
  )?.isLeader;

  const handleLeave = () => leaveTeam.mutate();
  const handleDelete = () => deleteTeam.mutate();
  const handleToggleAcceptingMembers = () => toggleAcceptingMembers.mutate();

  const isPending =
    leaveTeam.isPending ||
    deleteTeam.isPending ||
    toggleAcceptingMembers.isPending;

  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="py-16 max-w-4xl mx-auto grid items-center gap-8 px-8 md:px-4">
        <div className="grid gap-4 text-center">
          <StrokedText
            text={team.teamName}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold"
          />

          <p className="text-lg md:text-xl font-medium">
            {team.acceptingMembers ? (
              <>
                New members are welcome! Invite Code: <b>{team.inviteCode}</b>
              </>
            ) : (
              "Not currently accepting members."
            )}
          </p>
        </div>

        <div className="z-20 w-full max-w-5xl mx-auto rounded-2xl bg-background-200 border-6 md:border-12 border-background-300 p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl md:text-2xl font-bold">Team Members</h3>
            <div className="flex flex-col gap-2">
              {team.members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-wrap items-center gap-2 text-base md:text-lg bg-background-100 rounded-lg px-4 py-2"
                >
                  <span className="font-semibold">{member.userName}</span>
                  {member.isLeader && <>👑</>}
                  <span className="text-sm opacity-70">
                    joined {timeAgo(member.joinedAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-between pt-4 border-t border-background-100">
            <button
              onClick={handleLeave}
              disabled={isPending}
              className="rounded-xl bg-blue-300 border-4 border-white px-4 py-2.5 text-white font-medium transition hover:opacity-90 disabled:opacity-70"
            >
              {leaveTeam.isPending ? "Leaving..." : "Leave team"}
            </button>

            {isLeader && (
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 sm:ml-auto">
                <button
                  onClick={handleToggleAcceptingMembers}
                  disabled={isPending}
                  className="rounded-xl bg-grass-400 border-4 border-white px-4 py-2.5 text-white font-medium transition hover:opacity-90 disabled:opacity-70"
                >
                  {toggleAcceptingMembers.isPending
                    ? "Saving changes..."
                    : team.acceptingMembers
                      ? "Restrict members"
                      : "Accept members"}
                </button>

                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="rounded-xl bg-orange-600 border-4 border-white px-4 py-2.5 text-white font-medium transition hover:opacity-90 disabled:opacity-70"
                >
                  {deleteTeam.isPending ? "Deleting team..." : "Delete team"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <img
        src="/hills_bg.svg"
        className="absolute bottom-0 w-full scale-y-50 origin-bottom"
      />
      <img
        src="/blue_capy.svg"
        className="z-20 w-32 absolute bottom-0 left-0 md:left-32"
      />
      <img
        src="/pink_capy.svg"
        className="z-20 w-32 absolute bottom-0 left-1/5 md:left-70"
      />
      <img
        src="/capybara2.svg"
        className="z-20 w-32 absolute bottom-0 right-0 md:right-1/5"
      />
    </div>
  );
};

function TeamPage() {
  const clerkUser = Route.useRouteContext().auth.user!;
  const userQuery = useUser(clerkUser.id);
  const teamQuery = useUserTeam(clerkUser.id);

  if (userQuery.isLoading) return <LoadingPage />;
  if (userQuery.error) return <ErrorPage />;

  if (!userQuery.data) {
    return (
      <CreateUserForm
        userId={clerkUser.id}
        defaultUsername={clerkUser.username ?? ""}
        email={clerkUser.primaryEmailAddress?.emailAddress ?? null}
      />
    );
  }

  if (teamQuery.isLoading) return <LoadingPage />;
  if (teamQuery.error) return <ErrorPage />;

  if (!teamQuery.data) {
    return <CreateTeamForm userId={clerkUser.id} />;
  }

  const team = teamQuery.data;
  return <TeamView team={team} userId={clerkUser.id} />;
}
