import { useAuth, useSignIn } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type React from "react";

export const Navbar: React.FC = () => {
  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignIn = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: "/signin/sso-callback",
      redirectUrlComplete: "/team",
    });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative w-full py-4 px-8 flex items-center justify-between gap-8 text-2xl font-bold">
      {/* Hamburger Icon */}
      <div className="md:hidden flex-none">
        <button
          onClick={toggleMenu}
          className="group flex flex-col items-center justify-center w-10 h-10 gap-1 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-1 bg-grass-400 rounded-full transition-all duration-300 ease-in-out origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`w-6 h-1 bg-grass-400 rounded-full transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span
            className={`w-6 h-1 bg-grass-400 rounded-full transition-all duration-300 ease-in-out origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Logo/Title */}
      <div className="flex-1 md:flex-none">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img
            src="/logo.svg"
            alt="March Madness 2026"
            className="w-12 md:w-16"
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-end gap-8 flex-1">
        <NavLinks
          isSignedIn={isSignedIn}
          isLoaded={isLoaded}
          handleSignIn={handleSignIn}
          signOut={signOut}
        />
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-1/2 h-auto bg-grass-200 z-50 flex flex-col p-6 gap-4 text-lg md:hidden shadow-2xl items-start text-grass-400">
          <NavLinks
            isSignedIn={isSignedIn}
            isLoaded={isLoaded}
            activeProps={{ className: "text-gold-100" }}
            handleSignIn={handleSignIn}
            signOut={signOut}
            onItemClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({
  isSignedIn,
  isLoaded,
  handleSignIn,
  signOut,
  onItemClick,
}: any) => {
  const activeStyle = { className: "text-gold-100" };

  return (
    <>
      <Link
        to="/problems"
        onClick={onItemClick}
        activeProps={activeStyle}
        className="hover:text-gold-100 transition-colors"
      >
        Problems
      </Link>

      <Link
        to="/leaderboard"
        onClick={onItemClick}
        activeProps={activeStyle}
        className="hover:text-gold-100 transition-colors"
      >
        Leaderboard
      </Link>

      {isLoaded && isSignedIn ? (
        <>
          <Link
            to="/team"
            onClick={onItemClick}
            activeProps={activeStyle}
            className="hover:text-gold-100 transition-colors"
          >
            My Team
          </Link>
          <button
            onClick={() => {
              signOut();
              onItemClick?.();
            }}
            className="hover:text-gold-100 font-bold md:text-grass-400"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            handleSignIn();
            onItemClick?.();
          }}
          className="hover:text-gold-100 font-bold md:text-grass-400"
        >
          Sign In
        </button>
      )}
    </>
  );
};
