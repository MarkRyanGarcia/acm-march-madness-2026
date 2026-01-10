import { createFileRoute, redirect } from "@tanstack/react-router";
import type { Team } from "@/types/team";
import { CreateUserForm } from "@/components/CreateUser";
import { useUser } from "@/client/user/getUser";
import { useUserTeam } from "@/client/team/getUserTeam";
import { CreateTeamForm } from "@/components/CreateTeam";
import { useLeaveTeam } from "@/client/team/leaveTeam";
import { useDeleteTeam } from "@/client/team/deleteTeam";

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

  const isLeader = team.members.find(
    (member) => userId === member.id,
  )?.isLeader;

  const handleLeave = () => {
    leaveTeam.mutate();
  };

  const handleDelete = () => {
    deleteTeam.mutate();
  };

  return (
    <div>
      <h2>{team.teamName}</h2>
      <div>
        {team.acceptingMembers
          ? `New members are welcome! Invite Code: ${team.inviteCode}`
          : "Not currently accepting members"}
      </div>
      <div>
        {team.members.map((member) => (
          <div key={member.id}>
            <span>{member.userName}</span>
            {member.isLeader && <span> (supreme leader)</span>}
            <span> joined at {member.joinedAt}</span>
          </div>
        ))}
      </div>
      <button onClick={handleLeave}>Leave team</button>
      {isLeader && <button onClick={handleDelete}>Delete Team 😈</button>}
    </div>
  );
};

function TeamPage() {
  const clerkUser = Route.useRouteContext().auth.user!;
  const userQuery = useUser(clerkUser.id);
  const teamQuery = useUserTeam(clerkUser.id);

  if (userQuery.isLoading) return <div>Loading…</div>;
  if (!userQuery.data) {
    return (
      <CreateUserForm
        userId={clerkUser.id}
        defaultUsername={clerkUser.username ?? ""}
        email={clerkUser.primaryEmailAddress?.emailAddress ?? null}
      />
    );
  }

  if (teamQuery.isLoading) return <div>Loading...</div>;
  if (!teamQuery.data) {
    return <CreateTeamForm userId={clerkUser.id} />;
  }

  const team = teamQuery.data;
  return <TeamView team={team} userId={clerkUser.id} />;
}
