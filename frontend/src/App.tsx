import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Problems from './pages/Problems';
import ProblemDetail from './pages/ProblemDetail';
import Leaderboard from './pages/Leaderboard';

export default function App() {
    return (
        <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/problems" element={<Problems />} />
                        <Route path="/problems/:id" element={<ProblemDetail />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                    </Routes>
                </Box>
                <Footer />
            </Box>
        </Router>
    );
}