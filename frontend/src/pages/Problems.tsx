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

export interface Problem {
    id: number;
    name: string;
    desc: string;
    progress: number;
}

export const problemList: Problem[] = [
    {
        id: 1,
        name: "Historian Hysteria",
        desc: "The Chief Historian is always present for the big Christmas sleigh launch, but nobody has seen him in months! Last anyone heard, he was visiting locations that are historically significant to the North Pole; a group of Senior Historians has asked you to accompany them as they check the places they think he was most likely to visit.\n\nAs each location is checked, they will mark it on their list with a star. They figure the Chief Historian must be in one of the first fifty places they'll look, so in order to save Christmas, you need to help them get fifty stars on their list before Santa takes off on December 25th.\n\nCollect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!\n\nYou haven't even left yet and the group of Elvish Senior Historians has already hit a problem: their list of locations to check is currently empty. Eventually, someone decides that the best place to check first would be the Chief Historian's office.\n\nUpon pouring into the office, everyone confirms that the Chief Historian is indeed nowhere to be found. Instead, the Elves discover an assortment of notes and lists of historically significant locations! This seems to be the planning the Chief Historian was doing before he left. Perhaps these notes can be used to determine which locations to search?\n\nThroughout the Chief's office, the historically significant locations are listed not by name but by a unique number called the location ID. To make sure they don't miss anything, The Historians split into two groups, each searching the office and trying to create their own complete list of location IDs. There's just one problem: by holding the two lists up side by side (your puzzle input), it quickly becomes clear that the lists aren't very similar. Maybe you can help The Historians reconcile their lists?",
        progress: 0,
    },
    {
        id: 2,
        name: "problem title 2",
        desc: "blah blah 2",
        progress: 1,
    },
    {
        id: 3,
        name: "problem title 3",
        desc: "blah blah blah 3",
        progress: 2,
    },
    {
        id: 4,
        name: "problem title 4",
        desc: "blah blah blah blah 4",
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