import { useParams } from "react-router-dom";
import { Typography, Stack, Paper, Box } from "@mui/material";
import { problemList } from "./Problems";

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
                <Typography variant="h4" gutterBottom>
                    {problem.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    {problem.desc}
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <pre><code >
                        {`3   4\n4   3\n2   5\n1   3\n3   9\n3   3`}
                    </code></pre>
                </Box>
            </Paper>
        </Stack>
    );
}