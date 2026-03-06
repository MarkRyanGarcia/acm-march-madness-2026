import { useState } from "react";
import { MarkdownHooks } from "react-markdown";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useSignIn, useUser } from "@clerk/clerk-react";
import type { Components } from "react-markdown";
import type { Problem } from "@/types/problem";
import { useProblem } from "@/client/problem/getProblem";
import { useSubmitProblem } from "@/client/problem/submitProblem";
import { StrokedText } from "@/components/StrokedText";
import { LoadingPage } from "@/components/Loading";
import NotFound from "@/components/NotFound";
import { useInput } from "@/client/problem/getInput";

export const Route = createFileRoute("/problems/$day/")({
    component: ProblemPage,
});

type SubmissionSectionProps = {
    day: string;
    problem: Problem;
    part: 1 | 2;
};

const SubmissionSection: React.FC<SubmissionSectionProps> = ({
    day,
    problem,
    part,
}) => {
    const { signIn, isLoaded: signInLoaded } = useSignIn();
    const { isSignedIn } = useUser();

    const handleSignIn = () => {
        if (!signInLoaded) return;

        signIn.authenticateWithRedirect({
            strategy: "oauth_github",
            redirectUrl: "/signin/sso-callback",
            redirectUrlComplete: "/team",
        });
    };

    const submitProblem = useSubmitProblem(day);
    const [answer, setAnswer] = useState("");

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = () => {
        submitProblem.mutate({
            part,
            answer,
        });
    };

    if (!problem.signedIn || !isSignedIn) {
        return (
            <p className="font-semibold">
                <button onClick={handleSignIn} className="underline underline-offset-2">
                    Sign in
                </button>{" "}
                to submit your answer for this problem!
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
                className="font-bold bg-background-600 px-2 rounded-md disabled:opacity-70"
                disabled={submitProblem.isPending}
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};

function ProblemPage() {
    const { day } = Route.useParams();
    const { isLoading, data: problem, error } = useProblem(day);
    const getInput = useInput(day);

    if (isLoading) return <LoadingPage />;
    if (error || !problem) return <NotFound />;

    const components: Components = {
        h1: ({ children }) => (
            <h2 className="font-bold text-3xl">
                <StrokedText
                    text={children!.toString()}
                    className="text-2xl md:text-4xl font-bold text-center font-[Fredoka]"
                />
            </h2>
        ),
        h2: ({ children }) => <h3 className="font-bold text-2xl">{children}</h3>,
        blockquote: ({ children }) => (
            <blockquote className="bg-background-600 p-2 border-l-4 border-background-700 pl-4">
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

    return (
        <>
            <main className="relative p-8 z-10">
                <article className="max-w-6xl mx-auto bg-background-300/80 border-12 border-background-600/90 z-10 p-8 my-8 rounded-2xl text-lg flex flex-col gap-8 font-[Fira_Code] font-medium">
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
                            {problem.canSubmit && (
                                <div>
                                    To begin,{" "}
                                    <button
                                        onClick={() => getInput.mutate()}
                                        className="underline underline-offset-2"
                                    >
                                        get your puzzle input
                                    </button>
                                    .
                                </div>
                            )}

                            <SubmissionSection day={day} part={1} problem={problem} />
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
                                    {problem.canSubmit && (
                                        <div>
                                            Even though it hasn't changed, you can still{" "}
                                            <button
                                                onClick={() => getInput.mutate()}
                                                className="underline underline-offset-2"
                                            >
                                                get your puzzle input
                                            </button>
                                            .
                                        </div>
                                    )}

                                    <SubmissionSection day={day} part={2} problem={problem} />
                                </>
                            )}
                        </>
                    )}
                </article>
            </main>
            {/* <div className="-z-10 pointer-events-none">
                <img
                    src="/cloud1.svg"
                    className="absolute right-0 sm:right-40 top-10 md:top-10 w-55 md:w-120 lg:w-150 opacity-50"
                />
                <img
                    src="/cloud2.svg"
                    className="absolute left-5 md:left-10 top-30 md:top-35 w-35 md:w-60 lg:w-80 opacity-50"
                />
            </div> */}
            <div className="relative z-0 pointer-events-none">
                <img src="/grass2.svg" className="w-full absolute bottom-0" />
                <img src="/grass1.svg" className="w-full absolute bottom-0" />

            </div>
            <div className="pointer-events-none absolute inset-0 z-1">
                <img
                    src="/flower_ixora.svg"
                    className="absolute -left-2.5 top-50 md:top-80 w-16 md:w-35 lg:w-50 opacity-50 md:opacity-100"
                />
                <img
                    src="/random_flower.svg"
                    className="absolute -right-2.5 top-180 md:top-145 w-20 md:w-40 lg:w-48 opacity-50 md:opacity-100"
                />
                <img
                    src="/hibiscus1.svg"
                    className="absolute -left-2.5 top-300 md:top-260 w-20 md:w-40 lg:w-48 -scale-x-100 opacity-50 md:opacity-100"
                />
            </div>

        </>
    );
}
