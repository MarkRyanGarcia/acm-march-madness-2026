import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import type { ProblemSubmission } from "@/types/problem";
import { SUBMIT_REDIRECT_KEY } from "@/constants/localStorage";
import { formatSecondsAsText } from "@/utils/date";
import { StrokedText } from "@/components/StrokedText";
import { LoadingPage } from "@/components/Loading";

export const Route = createFileRoute("/problems/$day/submission")({
  beforeLoad: ({ params }) => {
    const val = localStorage.getItem(SUBMIT_REDIRECT_KEY);
    if (!val) {
      throw redirect({ to: "/problems/$day", params: { day: params.day } });
    }

    const submission: ProblemSubmission = JSON.parse(val);
    localStorage.removeItem(SUBMIT_REDIRECT_KEY);
    return { submission };
  },
  loader: ({ context }) => ({ submission: context.submission }),
  pendingComponent: LoadingPage,
  component: RouteComponent,
});

const Capybara: React.FC<{ correct: boolean }> = ({ correct }) => {
  const [imgNum, setImgNum] = useState(2);
  setTimeout(() => setImgNum(3 - imgNum), 750);
  const src = correct
    ? `/happy_capybara${imgNum}.svg`
    : `/sad_capybara${imgNum}.svg`;

  return <img src={src} className="w-32 justify-self-end" />;
};

function RouteComponent() {
  const { submission } = Route.useLoaderData();
  const { day } = Route.useParams();

  return (
    <div className="px-8 mt-16 max-w-5xl mx-auto grid gap-16">
      <Link
        to="/problems/$day"
        params={{ day }}
        className="max-w-max px-4 py-2 bg-background-200 border-4 border-grass-400 rounded-xl transition hover:opacity-90"
      >
        Back to the problem page
      </Link>
      <div className="grid gap-4">
        <div className="bg-background-500 p-4 rounded-xl relative text-xl md:text-2xl font-bold">
          {submission.correct ? (
            <>
              <StrokedText text="That's the correct answer!" /> You are one{" "}
              <span className="text-gold-100">golden egg</span> closer to
              finishing your journey!
            </>
          ) : (
            <span className="text-orange-300 font-medium">
              {submission.error
                ? "You gave an answer too recently."
                : "That's not the right answer. If you are stuck, feel free to drop a message in the ACM CSUF Discord and maybe someone will give you a hint!"}{" "}
              Please wait{" "}
              {formatSecondsAsText(submission.remainingCooldownSeconds)} before
              submitting again.
            </span>
          )}
          <div className="absolute -bottom-6 right-32 w-8 h-8 rounded-lg bg-background-500 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
        </div>
        <Capybara correct={submission.correct} />
      </div>
    </div>
  );
}
