import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import type { ProblemSubmission } from "@/types/problem";
import { SUBMIT_REDIRECT_KEY } from "@/constants/localStorage";
import { formatSecondsAsText } from "@/utils/date";
import { StrokedText } from "@/components/StrokedText";
import { LoadingPage } from "@/components/Loading";
import { Capybara } from "@/components/Capybara";

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
  component: ProblemSubmissionPage,
});

function ProblemSubmissionPage() {
  const { submission } = Route.useLoaderData();
  const { day } = Route.useParams();

  const ProblemLink: React.FC<{ className?: string }> = ({ className }) => (
    <Link
      to="/problems/$day"
      params={{ day }}
      className={`max-w-max px-4 py-2 bg-background-200 border-4 border-grass-400 rounded-xl text-xl font-medium transition hover:opacity-90 ${className}`}
    >
      {submission.correct && submission.part === 1
        ? "Continue to Part Two"
        : "Back to the problem page"}
    </Link>
  );

  return (
    <div className="px-8 mt-20 max-w-3xl mx-auto grid gap-16">
      <div className="grid gap-4">
        <ProblemLink className="text-[1rem] sm:hidden" />
        <div className="bg-background-500 p-8 rounded-xl relative text-xl md:text-2xl font-bold">
          {submission.correct ? (
            <>
              <StrokedText text="That's the correct answer!" />{" "}
              {submission.part === 1 ? (
                <>
                  Return to the problem page and complete part 2 of this puzzle to obtain
                  the full <span className="text-gold-100">golden egg</span>!
                </>
              ) : day === 5 && submission.part === 2 ? (
                <>
                  Thank you for participating in March Madness 2026. You can go back and solve the
                  remaining problems if you haven't already. We hope you enjoyed the event!
                </>
              ) : (
                <>
                  You are one <span className="text-gold-100">golden egg</span>{" "}
                  closer to finishing your journey!
                </>
              )}
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
        <div className="flex items-start justify-between flex-row-reverse sm:flex-row">
          <ProblemLink className="hidden sm:block" />
          <Capybara correct={submission.correct} />
        </div>
      </div>
    </div>
  );
}
