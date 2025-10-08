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
                py: 2,
                px: { md: 15, xs: 2 },
                mt: 'auto',
                background: '#041536',
            }}
        >
            <Grid container spacing={isMobile ? 4 : 15} justifyContent={"center"}>
                <Grid size={{ xs: 12, lg: 3, md: 4 }} sx={{ textAlign: isMobile ? "center" : "left" }} order={{ xs: 2, lg: 1, md: 1 }}>
                    <Stack spacing={1} alignItems={isMobile ? "center" : "flex-start"}>
                        <Typography variant="h6" color="white">
                            <strong>Stay Connected</strong>
                        </Typography>
                        <Stack direction="row" spacing={2.5} justifyContent={isMobile ? "center" : "flex-start"}>
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
                                    p: 0
                                }}
                            >
                                <DiscordIcon style={{ height: 25, width: 25, fill: "currentColor" }} />
                            </IconButton>
                            <IconButton
                                href="https://acmcsuf.com/instagram"
                                target="_blank"
                                sx={{
                                    color: '#dddddd',
                                    transition: 'all 0.2s ease-in-out',
                                    "&:hover": {
                                        color: 'white',
                                        transform: "translateY(-2px)",
                                    },
                                    p: 0
                                }}
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton
                                href="https://acmcsuf.com/youtube"
                                target="_blank"
                                sx={{
                                    color: '#dddddd',
                                    transition: 'all 0.2s ease-in-out',
                                    "&:hover": {
                                        color: 'white',
                                        transform: "translateY(-2px)",
                                    },
                                    p: 0
                                }}
                            >
                                <YouTube />
                            </IconButton>
                            <IconButton
                                href="https://acmcsuf.com/linkedin"
                                target="_blank"
                                sx={{
                                    color: '#dddddd',
                                    transition: 'all 0.2s ease-in-out',
                                    "&:hover": {
                                        color: 'white',
                                        transform: "translateY(-2px)",
                                    },
                                    p: 0
                                }}
                            >
                                <LinkedIn />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12, lg: 6, md: 4 }} sx={{ textAlign: "center" }} order={{ xs: 1, lg: 2, md: 2 }}>
                    <Stack spacing={1}>
                        <Typography variant="h6" color="white">
                            <strong>© {new Date().getFullYear()} ACM Chapter at CSUF</strong>
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#dddddd",
                                textDecoration: "none",
                                "&:hover": {
                                    color: "white",
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Made by <a href='https://github.com/MarkRyanGarcia' style={{ color: 'yellow', }}>Mark</a> and <a href='https://github.com/elenav24' style={{ color: 'yellow', }}>Elena</a>, with borrowed code from <a href='https://github.com/acmCSUFDev/march-madness-2024' style={{ color: 'yellow', }}>Diamond</a>
                        </Typography>
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12, lg: 3, md: 4 }} sx={{ textAlign: isMobile ? "center" : "right" }} order={3}>
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