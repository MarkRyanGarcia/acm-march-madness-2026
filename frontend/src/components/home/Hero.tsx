import { Stack, Typography } from "@mui/material";

export default function Hero() {
    return (
        <Stack spacing={5} sx={{ alignItems: 'center', alignText: 'center', py: 2, px: 25, backgroundColor: '#041536' }}>
            <Typography variant="h2" color="white"><strong>ACM March Madness 2026</strong></Typography>
            <Typography variant="body1" color="white">
                Compete in weekly coding challenges throughout March! Solve problems faster, earn more points, and climb the leaderboard. Sharpen your skills, challenge your peers, and claim bragging rights.
            </Typography>
        </Stack>
    );
}