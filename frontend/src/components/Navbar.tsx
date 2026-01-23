import { useAuth, useSignIn } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import type React from "react";

export const Navbar: React.FC = () => {
  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn, signOut } = useAuth();

  const handleSignIn = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: "/signin/sso-callback",
      redirectUrlComplete: "/team",
    });
  };

  return (
    <nav className="w-full py-4 px-8 flex items-center justify-between gap-8 text-lg font-bold">
      <div>
        <Link to="/">
          <span className="text-lg">March Madness 2026</span>
        </Link>
      </div>
      <div className="hidden md:flex items-center justify-center gap-8">
        <Link to="/problems">Problems</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {isLoaded && isSignedIn ? (
          <>
            <Link to="/team">My Team</Link>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <button onClick={handleSignIn}>Sign In</button>
        )}
      </div>
    </nav>
  );
};
