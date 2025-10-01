import { GitHub } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function Hero() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <Stack spacing={5} sx={{ alignItems: 'center', alignText: 'center', py: { md: 2, xs: 5 }, px: { md: 25, xs: 2 }, backgroundColor: '#041536' }}>
            <Typography variant="h2" color="white" align="center"><strong>ACM March Madness 2026</strong></Typography>
            <Grid container spacing={5}>
                <Grid size={{ md: 8, xs: 12 }}>
                    <Typography variant="body1" color="white" align={isMobile ? 'center' : 'left'}>
                        A Programming Competition for ACM at CSUF. Compete in weekly coding challenges throughout March! Solve problems faster, earn more points, and climb the leaderboard. Sharpen your skills, challenge your peers, and claim bragging rights.
                    </Typography>
                </Grid>
                <Grid size={{ md: 4, xs: 12 }}>
                    <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <Button variant="contained" startIcon={<GitHub />}>
                            Login with GitHub
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Stack >
    );
}