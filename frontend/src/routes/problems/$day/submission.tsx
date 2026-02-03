import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/problems/$day/submission")({
  validateSearch: (search: Record<string, unknown>) => ({
    correct: search.correct as boolean | undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { day } = Route.useParams();
  const { correct } = Route.useSearch();

  return (
    <div>
      {correct ? (
        <p>
          That's the correct answer! You are one golden egg closer to finishing
          this journey.
        </p>
      ) : (
        <p>
          That's not the right answer. If you are stuck, feel free to drop a
          message in the ACM CSUF Discord and maybe someone will give you a hint
          ;)
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
