import { MarkdownHooks } from "react-markdown";
import { createFileRoute } from "@tanstack/react-router";
import { useProblem } from "@/client/problem/getProblem";

export const Route = createFileRoute("/problems/$day")({
  component: RouteComponent,
});

function RouteComponent() {
  const { day } = Route.useParams();
  const { isLoading, data: problem } = useProblem(day);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <article className="bg-sky-600 max-w-6xl mx-auto text-slate-200 p-8 my-8 rounded-lg text-lg flex flex-col gap-4">
      <MarkdownHooks>{problem}</MarkdownHooks>
    </article>
  );
}
