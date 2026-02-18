import { Link, createFileRoute } from "@tanstack/react-router";
import { StrokedText } from "@/components/StrokedText";

export const Route = createFileRoute("/problems/")({
  component: RouteComponent,
});

function RouteComponent() {
  const problems = ["Day 0", "Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];

  return (
    <div className="relative p-4 max-w-4xl mx-auto grid justify-center gap-8 mt-8 md:mt-12 font-[Fredoka]">
      <h1 className="font-extrabold text-center">
        <StrokedText
          text="WEEK OF CODE"
          color="var(--orange-200)"
          outlineColor="var(--orange-300)"
          className="text-3xl sm:text-5xl md:text-7xl tracking-wider"
        />
      </h1>
      <p className="text-center font-bold md:text-xl">
        A new coding problem every day! For each problem, you can earn up to 100
        points for each part you solve. You may get more points for solving
        problems as soon as they are released, so keep an eye out for the next
        problem!
      </p>

      <div className="relative rounded-xl w-full mx-auto grid gap-4 items-center px-6 md:px-12 py-6 bg-background-300 border-4 border-background-200">
        <h2 className="text-3xl text-center font-bold">Daily Challenges</h2>
        <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          {problems.map((problem, i) => (
            <Link
              key={problem}
              to="/problems/$day"
              params={{ day: "0" }}
              disabled={i > 2}
              className={`rounded-xl border-white border-4 text-white font-bold text-center p-2 sm:p-4 text-xl transition ${i > 2 ? "bg-gray-500" : "bg-grass-400 hover:bg-gold-100"}`}
            >
              {problem}
            </Link>
          ))}
        </div>
        <div className="font-medium text-center">
          Next Challenge Releases in: 14h 23m 50s
        </div>
        <div className="absolute -bottom-6 right-1/4 sm:right-1/6 w-8 h-8 rounded-lg bg-background-300 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
        <img
          src="/capybara.svg"
          className="absolute -bottom-1/2 right-0 w-40"
        />
      </div>
    </div>
  );
}
