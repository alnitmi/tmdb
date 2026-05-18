import { Container, Tabs, Tab } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const tabs = [
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Now Playing", path: "/movies/now-playing" },
];

export const MoviesLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentTab = location.pathname === "/movies" ? "/movies/popular" : location.pathname;

    return (
        <Container sx={{ mt: 3 }}>
            <Tabs value={currentTab} onChange={(_, newPath) => navigate(newPath)}>
                {tabs.map((tab) => (
                    <Tab key={tab.path} label={tab.label} value={tab.path} />
                ))}
            </Tabs>
            <Outlet />
        </Container>
    );
};