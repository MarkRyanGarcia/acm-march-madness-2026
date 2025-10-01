import { Stack, Typography } from "@mui/material";

export default function Home() {
    return (
        <Stack>
            <Stack sx={{ alignItems: 'center', alignText: 'center' }}>
                <Typography variant="h2" color="white">March Madness 2026</Typography>
                <Typography variant="caption" color="white">About Page</Typography>
            </Stack>
        </Stack>
    );
}