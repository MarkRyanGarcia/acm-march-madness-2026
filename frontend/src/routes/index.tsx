import { createFileRoute } from "@tanstack/react-router";
import type React from "react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const Hero: React.FC = () => {
  return (
    <div className="max-w-max mx-auto mt-12">
      <h1
        className="text-white font-extrabold text-center
        [-webkit-text-stroke:1.5px_rgb(88,108,140)]
        [text-shadow:-0px_6px_2px_rgb(var(--color-pink))]"
      >
        <span className="block text-8xl">March Madness</span>
        <span className="text-green-200 text-9xl">2026</span>
      </h1>
    </div>
  );
};

function LandingPage() {
  return (
    <main className="max-w-7xl mx-auto grid items-center justify-center gap-16">
      <Hero />
      <p className="text-center text-white font-bold [-webkit-text-stroke:0.7px_black] text-xl">
        A 5-day coding challenge event hosted by ACM at California State
        University, Fullerton! Collaborate in teams and put your problem-solving
        skills to the test to see if you shall become the best!
      </p>
      <button className="py-2 px-6 rounded-xl bg-white max-w-max">
        Sign In With GitHub
      </button>
    </main>
  );
}
