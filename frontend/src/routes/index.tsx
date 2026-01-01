import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/")({
  component: App,
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

function App() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto">
        <Hero />
      </main>
    </div>
  );
}
