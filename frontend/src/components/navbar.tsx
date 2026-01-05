import { useAuth, useSignIn, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import type React from "react";

export const Navbar: React.FC = () => {
  const { signIn, isLoaded } = useSignIn();
  const { signOut } = useAuth();
  const { isSignedIn, user } = useUser();

  const handleSignIn = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: "/",
      redirectUrlComplete: "/team",
    });
  };

  return (
    <nav
      className="w-full py-4 px-8 flex items-center justify-between gap-8
      text-white text-lg font-bold [-webkit-text-stroke:0.4px_black]"
    >
      <div>
        <Link to="/">
          <span className="text-white text-lg">March Madness 2026</span>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-8">
        <div>Problems</div>
        <div>Leaderboard</div>
        {isLoaded && isSignedIn ? (
          <button onClick={() => signOut()}>{user.username}</button>
        ) : (
          <button onClick={handleSignIn}>Sign In</button>
        )}
      </div>
    </nav>
  );
};
