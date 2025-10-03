import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import {
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import problem1 from "../assets/problems/problem.md?raw";

export interface Problem {
    id: number;
    name: string;
    desc: string;
    progress: number;
}

export const problemList: Problem[] = [
    {
        id: 1,
        name: "Pairing Peers",
        desc: problem1,
        progress: 0,
    },
    {
        id: 2,
        name: "problem title 2",
        desc: problem1,
        progress: 1,
    },
    {
        id: 3,
        name: "problem title 3",
        desc: problem1,
        progress: 2,
    },
    {
        id: 4,
        name: "problem title 4",
        desc: problem1,
        progress: 2,
    },
];

export default function Problems() {
    const navigate = useNavigate();

    function getProgress(p: Problem) {
        const style = { color: "gold" };

        switch (p.progress) {
            case 0:
                return <StarOutline sx={style} />;
            case 1:
                return <StarHalf sx={style} />;
            case 2:
                return <Star sx={style} />;
            default:
                return null;
        }
    }

    return (
        <Stack>
            <Stack sx={{ alignItems: "center", textAlign: "center" }}>
                <Typography variant="h2" color="white">
                    Problems
                </Typography>
                <Paper sx={{ width: "100%", maxWidth: 600, mt: 2 }}>
                    <List>
                        {problemList.map((problem, idx) => (
                            <ListItemButton
                                key={`problem-${idx}`}
                                onClick={() => navigate(`/problems/${idx + 1}`)}
                            >
                                {getProgress(problem)}
                                <ListItemText primary={`Problem ${idx + 1} - ${problem.name}`} />
                            </ListItemButton>
                        ))}
                    </List>
                </Paper>
            </Stack>
        </Stack>
    );
}