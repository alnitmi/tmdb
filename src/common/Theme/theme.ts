import { createTheme } from "@mui/material/styles";

export type ThemeMode = "dark" | "light";

export const getTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#08101d" : "#f4f7fb",
        paper: mode === "dark" ? "#0f1b31" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#f7fbff" : "#12213d",
        secondary: mode === "dark" ? "#9eb3ce" : "#5d6d89",
      },
    },
    typography: {
      fontFamily: '"Outfit", "Segoe UI", sans-serif',
      h1: {
        fontWeight: 800,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
      button: {
        fontWeight: 700,
        textTransform: "none",
      },
    },
  });
