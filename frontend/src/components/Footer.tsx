import { Instagram, LinkedIn, YouTube } from '@mui/icons-material';
import { Grid, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import DiscordIcon from "../assets/icons/discord.svg?react";

export default function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Stack
            component="footer"
            sx={{
                py: 3,
                px: 12,
                mt: 'auto',
                background: '#052155',
            }}
        >
            <Grid container spacing={isMobile ? 4 : 15} alignItems={"center"} justifyContent={"center"}>
                <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: isMobile ? "center" : "left" }} order={{ xs: 2, md: 1 }}>
                    <Stack spacing={1} alignItems={isMobile ? "center" : "flex-start"}>
                        <Typography variant="h6" color="white">
                            <strong>Stay Connected</strong>
                        </Typography>
                        <Stack direction="row" spacing={1} justifyContent={isMobile ? "center" : "flex-start"}>
                            <IconButton
                                href="https://acmcsuf.com/discord"
                                target="_blank"
                                sx={{
                                    color: "#dddddd",
                                    transition: 'all 0.2s ease-in-out',
                                    "&:hover": {
                                        color: "white",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                <DiscordIcon style={{ height: 25, width: 25, fill: "currentColor" }} />
                            </IconButton>
                            <IconButton href="https://acmcsuf.com/instagram" target="_blank" sx={{ color: '#dddddd', "&:hover": { color: 'white' } }}>
                                <Instagram />
                            </IconButton>
                            <IconButton href="https://acmcsuf.com/youtube" target="_blank" sx={{ color: '#dddddd', "&:hover": { color: 'white' } }}>
                                <YouTube />
                            </IconButton>
                            <IconButton href="https://acmcsuf.com/linkedin" target="_blank" sx={{ color: '#dddddd', "&:hover": { color: 'white' } }}>
                                <LinkedIn />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }} order={{ xs: 1, md: 2 }}>
                    <Stack spacing={1}>
                        <Typography variant="h6" color="white">
                            <strong>© 2026 ACM Chapter at CSUF</strong>
                        </Typography>
                        <Typography
                            variant="body1"
                            component="a"
                            href="https://acmcsuf.com/"
                            target="_blank"
                            sx={{
                                color: "#dddddd",
                                textDecoration: "none",
                                "&:hover": {
                                    color: "white",
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            acmcsuf.com
                        </Typography>
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: isMobile ? "center" : "right" }} order={3}>
                    <Stack spacing={1} alignItems={isMobile ? "center" : "flex-end"}>
                        <Typography variant="h6" color="white">
                            <strong>More From Us</strong>
                        </Typography>
                        <Typography
                            variant="body1"
                            component="a"
                            href="https://acmcsuf.com/"
                            target="_blank"
                            sx={{
                                color: "#dddddd",
                                textDecoration: "none",
                                "&:hover": {
                                    color: "white",
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            ACM at CSUF
                        </Typography>
                        <Typography
                            variant="body1"
                            component="a"
                            href="https://github.com/MarkRyanGarcia/acm-march-madness-2026"
                            target="_blank"
                            sx={{
                                color: "#dddddd",
                                textDecoration: "none",
                                "&:hover": {
                                    color: "white",
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Source Code
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}