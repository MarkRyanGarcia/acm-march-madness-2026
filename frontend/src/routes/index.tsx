import { createFileRoute } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import type React from "react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const Hero: React.FC = () => {
  return (
    <div className="max-w-max mx-auto px-4 mt-12 font-[DynaPuff]">
      <h1 className="font-extrabold text-center">
        <span className="block text-blue-300 text-5xl md:text-8xl [-webkit-text-stroke:3px_var(--pink-200)]">
          March Madness
        </span>
        <span className="text-pink-300 text-7xl md:text-9xl">2026</span>
      </h1>
    </div>
  );
};

function LandingPage() {
  return (
    <div>
      <main className="max-w-5xl mx-auto grid items-center justify-center gap-8 md:gap-16">
        <Hero />
        <p className="px-8 text-center text-grass-400 font-[Fredoka] font-bold md:text-2xl">
          A 5-day coding challenge event hosted by ACM at California State
          University, Fullerton! Collaborate in teams and put your
          problem-solving skills to the test to see if you shall become the
          best!
        </p>
        <div className="flex items-center justify-center">
          <button className="flex items-center gap-2 py-2 px-6 rounded-xl bg-white max-w-max font-semibold text-xl">
            Sign In With GitHub <FaGithub />
          </button>
        </div>
      </main>
      <div className="relative -z-10">
        <img src="/grass2.svg" className="w-full absolute md:-top-24" />
        <img src="/grass1.svg" className="w-full absolute md:-top-24" />
        <img
          src="/capybara.svg"
          className="absolute right-12 md:right-24 md:-top-24 xl:-top-32 w-16 md:w-24"
        />
      </div>
    </div>
  );
}
