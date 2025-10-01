import { AppBar, Toolbar, Typography, Tabs, Tab, IconButton, Menu, MenuItem, useMediaQuery, useTheme, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ACM from "../assets/icons/badge-acm.svg";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const tabValue = location.pathname === '/' ? '/' : location.pathname;

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTabSelect = (navRoute: string) => {
        navigate(navRoute);
        handleClose();
    };

    const navItems = [
        { label: 'Home', navRoute: '/' },
        { label: 'Problems', navRoute: '/problems' },
        { label: 'Leaderboard', navRoute: '/leaderboard' },
    ];

    return (
        <AppBar position="sticky" sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: '#052155'
        }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    aria-label="logo"
                    onClick={() => navigate('/')}
                >
                    <img src={ACM} alt="ACM Logo" style={{ height: 50, width: 50 }} />
                </IconButton>
                <Typography
                    variant="h5"
                    onClick={() => navigate('/')}
                    sx={{
                        flexGrow: 1, cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-3px)'
                        }
                    }}
                >
                    <strong>March Madness</strong>
                </Typography>

                {isMobile ? (
                    <>
                        <IconButton color="inherit" onClick={handleMenuClick}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={!!anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            {navItems.map((item) => (
                                <MenuItem key={item.navRoute} onClick={() => handleTabSelect(item.navRoute)}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                ) : (
                    <Tabs
                        value={tabValue}
                        onChange={(_, newValue) => handleTabSelect(newValue)}
                        textColor="inherit"
                        indicatorColor="primary"
                        slotProps={{ indicator: { sx: { height: 3 } } }}
                    >
                        {navItems.map((item) => (
                            <Tab key={item.navRoute} value={item.navRoute} label={item.label} />
                        ))}
                    </Tabs>
                )}
            </Toolbar>
        </AppBar>
    );
}