import { useParams } from "react-router-dom";
import { Typography, Stack, Paper, } from "@mui/material";
import { problemList } from "./Problems";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ProblemDetail() {
    const { id } = useParams<{ id: string }>();
    const problemId = Number(id);

    // find the problem by id (safer than using index math)
    const problem = problemList.find((p) => p.id === problemId);

    if (!problem) {
        return (
            <Stack sx={{ alignItems: "center", textAlign: "center", mt: 4 }}>
                <Paper sx={{ p: 4, maxWidth: 800 }}>
                    <Typography variant="h4" color="error" gutterBottom>
                        Problem Not Found
                    </Typography>
                    <Typography variant="body1">
                        Sorry, the problem {id} does not exist or is not yet released.
                    </Typography>
                </Paper>
            </Stack>
        );
    }

    return (
        <Stack sx={{ alignItems: "center", textAlign: "center", mt: 4 }}>
            <Paper sx={{ p: 4, maxWidth: 800 }}>
                <div style={{ padding: "20px" }}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code: ({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                            }: React.DetailedHTMLProps<
                                React.HTMLAttributes<HTMLElement>,
                                HTMLElement
                            > & {
                                inline?: boolean;
                                node?: any;
                            }) => {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={oneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {problem.desc}
                    </ReactMarkdown>
                </div>
            </Paper>
        </Stack>
    );
}