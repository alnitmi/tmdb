import Box from "@mui/material/Box";
import type { ThemeMode } from "@/common/Theme/theme";
import classes from "./Footer.module.css";

type FooterProps = {
  mode: ThemeMode;
};

export const Footer = ({ mode }: FooterProps) => {
  const footerClass = `${classes.footer} ${mode === "dark" ? classes.dark : classes.light}`;

  return (
      <Box component="footer" className={footerClass}>
        © 2025 Kinopoisk Demo • Data courtesy of TMDB.
      </Box>
  );
};