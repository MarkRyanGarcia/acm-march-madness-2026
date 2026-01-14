import { MarkdownHooks } from "react-markdown";
import { createFileRoute } from "@tanstack/react-router";
import type { Components } from "react-markdown";
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

  const components: Components = {
    h1: ({ children }) => <h2 className="font-bold text-3xl">{children}</h2>,
    h2: ({ children }) => <h3 className="font-bold text-2xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="bg-sky-600 p-2 border-l-4 border-white pl-4">
        {children}
      </blockquote>
    ),
    pre: ({ children }) => (
      <pre className="p-1 rounded-sm w-max bg-sky-600">{children}</pre>
    ),
    code: ({ children }) => (
      <code className="bg-sky-600 rounded-sm px-1">{children}</code>
    ),
    li: ({ children }) => <li>- {children}</li>,
  };

  return (
    <main className="p-8">
      <article className="max-w-6xl mx-auto bg-sky-500 text-slate-200 p-8 my-8 rounded-lg text-lg flex flex-col gap-8 font-[Fira_Code]">
        <MarkdownHooks components={components}>{problem!.part1}</MarkdownHooks>
        {problem?.part1Answer ? (
          <>
            {!problem.part2Answer && (
              <p className="text-yellow-300 text-shadow-yellow-300 text-shadow-xs">
                You got the first part correct! This awards you one golden egg.
              </p>
            )}
            <p>Your puzzle answer was: {problem.part1Answer}</p>
          </>
        ) : (
          <>
            <div>
              To being,{" "}
              <button className="underline underline-offset-2">
                get your puzzle input
              </button>
              .
            </div>
            <div className="flex gap-2 items-center">
              Answer:
              <input type="text" className="bg-sky-600 rounded-sm" />
              <button className="font-bold">[Submit]</button>
            </div>
          </>
        )}
        <MarkdownHooks components={components}>{problem!.part2}</MarkdownHooks>
      </article>
    </main>
  );
}
