import { useState } from "react";
import { MarkdownHooks } from "react-markdown";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { Components } from "react-markdown";
import { useProblem } from "@/client/problem/getProblem";
import { useSubmitProblem } from "@/client/problem/submitProblem";
import { StrokedText } from "@/components/StrokedText";

export const Route = createFileRoute("/problems/$day/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { day } = Route.useParams();
  const { isLoading, data: problem } = useProblem(day);
  const submitProblem = useSubmitProblem(day);
  const [answer, setAnswer] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (!problem) return null;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (part: 1 | 2) => {
    submitProblem.mutate({
      part,
      answer,
    });
  };

  const components: Components = {
    h1: ({ children }) => (
      <h2 className="font-bold text-3xl">
        <StrokedText
          text={children!.toString()}
          color="var(--orange-200)"
          outlineColor="var(--orange-300)"
          className="text-2xl md:text-4xl font-bold text-center font-[Fredoka]"
        />
      </h2>
    ),
    h2: ({ children }) => <h3 className="font-bold text-2xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="bg-background-600 p-2 border-l-4 border-white pl-4">
        {children}
      </blockquote>
    ),
    pre: ({ children }) => (
      <pre className="p-1 rounded-sm w-max bg-background-600">{children}</pre>
    ),
    code: ({ children }) => (
      <code className="bg-background-600 rounded-sm px-1">{children}</code>
    ),
    li: ({ children }) => <li>- {children}</li>,
  };

  const SubmissionSection = ({ part }: { part: 1 | 2 }) => {
    if (!problem.signedIn) {
      return (
        <p className="font-semibold">
          Sign in to submit your answer for this problem!
        </p>
      );
    }

    if (!problem.canSubmit) {
      return (
        <p className="font-semibold">
          You must create or join a{" "}
          <Link to="/team" className="underline underline-offset-2">
            team
          </Link>{" "}
          to submit your answer!
        </p>
      );
    }

    return (
      <div className="flex gap-2 items-center">
        Answer:
        <input
          type="text"
          value={answer}
          className="outline-none px-1 bg-background-600 rounded-sm"
          onChange={handleChangeInput}
        />
        <button
          className="font-bold bg-background-600 px-2 rounded-md"
          disabled={submitProblem.isPending}
          onClick={() => handleSubmit(part)}
        >
          Submit
        </button>
      </div>
    );
  };

  return (
    <main className="p-8">
      <article className="max-w-6xl mx-auto bg-background-500 text-background-700 p-8 my-8 rounded-lg text-lg flex flex-col gap-8 font-[Fira_Code]">
        <MarkdownHooks components={components}>{problem.part1}</MarkdownHooks>

        {problem.part1Answer ? (
          <>
            {!problem.part2Answer && (
              <p className="text-gold-100 text-shadow-gold-100 text-shadow-xs">
                You got the first part correct! This awards you one golden egg.
              </p>
            )}
            <p>Your puzzle answer was: {problem.part1Answer}</p>
          </>
        ) : (
          <>
            <div>
              To begin,{" "}
              <a
                href={`http://localhost:8000/problems/${day}/input`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                get your puzzle input
              </a>
              .
            </div>

            <SubmissionSection part={1} />
          </>
        )}

        {problem.part2 !== "" && (
          <>
            <MarkdownHooks components={components}>
              {problem.part2}
            </MarkdownHooks>

            {problem.part2Answer ? (
              <p className="text-gold-100 text-shadow-gold-100 text-shadow-xs">
                Both parts of the puzzle are complete! You obtained two eggs.
              </p>
            ) : (
              <>
                <div>
                  Even though it hasn't changed, you can still{" "}
                  <a
                    href={`http://localhost:8000/problems/${day}/input`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    get your puzzle input
                  </a>
                  .
                </div>

                <SubmissionSection part={2} />
              </>
            )}
          </>
        )}
      </article>
    </main>
  );
}
