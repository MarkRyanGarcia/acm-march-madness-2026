import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateUserForm } from "@/components/CreateUser";
import { useUser } from "@/client/getUser";
import { useUserTeam } from "@/client/getUserTeam";

export const Route = createFileRoute("/team")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isSignedIn) {
      throw redirect({ to: "/" });
    }
  },
  component: TeamPage,
});

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
    return <div>You don't have a team bro</div>
  }

  return <div>Hello "/team"!</div>;
}
