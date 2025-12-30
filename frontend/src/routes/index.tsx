import { useAuth, useSignIn, useUser } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { signIn, isLoaded } = useSignIn();
  const { signOut } = useAuth();
  const { isSignedIn, user } = useUser();

  if (!isLoaded) return null;

  const handleSignIn = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: "/",
      redirectUrlComplete: "/",
    });
  };

  return (
    <div>
      Hello!
      {isSignedIn ? (
        <>
          <button onClick={() => signOut()}>Sign Out</button>
          <div>Welcome! {user.username}</div>
          <img src={user.imageUrl} className="w-20" />
        </>
      ) : (
        <button onClick={handleSignIn}>Sign In With GitHub</button>
      )}
    </div>
  );
}
