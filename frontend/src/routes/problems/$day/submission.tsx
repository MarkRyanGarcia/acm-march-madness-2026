import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import type { ProblemSubmission } from "@/types/problem";
import { SUBMIT_REDIRECT_KEY } from "@/constants/localStorage";
import { formatSecondsAsText } from "@/utils/date";

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
  component: RouteComponent,
});

function RouteComponent() {
  const { submission } = Route.useLoaderData();
  const { day } = Route.useParams();

  return (
    <div>
      {submission.correct ? (
        <p>
          That's the correct answer! You are one golden egg closer to finishing
          this journey.
        </p>
      ) : (
        <p>
          {submission.error ? (
            <>You gave an answer too recently. </>
          ) : (
            <>
              That's not the right answer. If you are stuck, feel free to drop a
              message in the ACM CSUF Discord and maybe someone will give you a
              hint!{" "}
            </>
          )}
          Please wait {formatSecondsAsText(submission.remainingCooldownSeconds)}{" "}
          before submitting again.
        </p>
      )}
      <p>
        Return to the{" "}
        <Link to="/problems/$day" params={{ day }}>
          problem page
        </Link>
      </p>
    </div>
  );
}
