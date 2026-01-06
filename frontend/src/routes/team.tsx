import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateUserForm } from "@/components/CreateUser";
import { useUser } from "@/client/getUser";

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

  const { isLoading, data } = useUser(clerkUser.id);

  if (isLoading) return <div>Loading…</div>;

  if (!data) {
    return (
      <CreateUserForm
        clerkUserId={clerkUser.id}
        defaultUsername={clerkUser.username ?? ""}
        email={clerkUser.primaryEmailAddress?.emailAddress ?? null}
      />
    );
  }
  return <div>Hello "/team"!</div>;
}
