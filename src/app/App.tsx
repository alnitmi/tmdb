import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Footer } from "@/common/components/Footer/Footer";
import { Header } from "@/common/components/Header/Header";
import { getTheme, type ThemeMode } from "@/common/Theme/theme";
import { AppRouter } from "@/common/Routing/router";
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar";

export function App() {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem("theme");
        return saved === "light" ? "light" : "dark";
    });

    useEffect(() => {
        localStorage.setItem("theme", mode);
    }, [mode]);

    const theme = getTheme(mode);
    const toggleTheme = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Header mode={mode} onToggleTheme={toggleTheme} />
                <Box sx={{ flex: 1 }}>
                    <AppRouter />
                </Box>
                <Footer mode={mode} />
            </Box>
            <ErrorSnackbar />
        </ThemeProvider>
    );
}