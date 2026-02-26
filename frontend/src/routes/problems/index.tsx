import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { StrokedText } from "@/components/StrokedText";
import { useProblemList } from "@/client/problem/getProblemList";
import { LoadingPage } from "@/components/Loading";
import ErrorPage from "@/components/Error";

export const Route = createFileRoute("/problems/")({
  component: ProblemsPage,
});

function calculateTimeLeft(nextRelease: Date) {
  const now = new Date().getTime();
  const target = nextRelease.getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function ProblemsPage() {
  const queryClient = useQueryClient();
  const problemListQuery = useProblemList();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(new Date()));

  useEffect(() => {
    const nextRelease = problemListQuery.data?.nextRelease;
    if (!nextRelease) return;

    setTimeLeft(calculateTimeLeft(nextRelease));

    const interval = setInterval(() => {
      const updated = calculateTimeLeft(nextRelease);
      setTimeLeft(updated);

      if (
        updated.hours === 0 &&
        updated.minutes === 0 &&
        updated.seconds === 0
      ) {
        queryClient.invalidateQueries({ queryKey: ["problemList"] });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [problemListQuery.data]);

  if (problemListQuery.isLoading) return <LoadingPage />;
  if (problemListQuery.error || !problemListQuery.data) return <ErrorPage />;

  const { problemList } = problemListQuery.data;

  const pad = (num: number) => String(num).padStart(2, "0");

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

      <div className="relative rounded-xl w-full mx-auto grid gap-4 items-center px-6 md:px-12 py-6 bg-background-200 border-12 border-background-500">
        <h2 className="text-3xl text-center font-bold">Daily Challenges</h2>
        <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          {problemList.map((problem) => (
            <Link
              key={"problem-link-" + problem.day}
              to="/problems/$day"
              params={{ day: problem.day.toString() }}
              disabled={!problem.released}
              className={`rounded-xl border-white border-4 text-white font-bold text-center p-2 sm:p-4 text-xl transition ${!problem.released ? "bg-gray-500" : "bg-grass-400 hover:bg-gold-100"}`}
            >
              Day {problem.day}
            </Link>
          ))}
        </div>
        <div className="font-medium text-center">
          Next challenge releases in {pad(timeLeft.hours)}hrs{" "}
          {pad(timeLeft.minutes)}mins {pad(timeLeft.seconds)}secs!
        </div>
        <div className="absolute -bottom-8 right-1/4 sm:right-1/6 w-8 h-8 rounded-lg bg-background-500 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
        <img
          src="/capybara.svg"
          className="absolute -bottom-1/2 right-0 w-40"
        />
      </div>
    </div>
  );
}
