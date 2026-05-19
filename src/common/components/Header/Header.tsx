import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import clsx from "clsx";
import { Link as RouterLink, useLocation } from "react-router-dom";
import type { ThemeMode } from "@/common/Theme/theme";
import logo from "@/assets/tmdb.svg";
import styles from "./Header.module.css";

type HeaderProps = {
  mode: ThemeMode;
  onToggleTheme: () => void;
};

const navItems = [
  { label: "Main", path: "/" },
  { label: "Category movies", path: "/movies" },
  { label: "Filtered movies", path: "/filtered-movies" },
  { label: "Search", path: "/search" },
  { label: "Favorites", path: "/favorites" },
] as const;

export const Header = ({ mode, onToggleTheme }: HeaderProps) => {
  const location = useLocation();

  return (
      <AppBar
          position="sticky"
          elevation={0}
          className={clsx(styles.appBar, mode === "light" && styles.lightAppBar)}
      >
        <Toolbar className={styles.toolbar}>
          <Container maxWidth="lg" className={styles.container}>
            <Box component={RouterLink} to="/" className={styles.logoLink}>
              <img src={logo} alt="TMDB Logo" className={styles.logo} />
            </Box>

            <Box className={styles.nav}>
              {navItems.map(({ label, path }, index) => {
                const isActive =
                    location.pathname === path ||
                    (path === "/movies" && location.pathname.startsWith("/movies"));

                return (
                    <Box key={label} className={styles.navItem}>
                      <Button
                          disableRipple
                          component={RouterLink}
                          to={path}
                          className={clsx(styles.navButton, isActive && styles.active)}
                          sx={{
                            borderRadius: 999,
                            padding: "10px 18px",
                            fontWeight: 700,
                            color: "inherit",
                            textTransform: "none",
                            whiteSpace: "nowrap",
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                      >
                        {label}
                      </Button>

                      {index < navItems.length - 1 && (
                          <Typography component="span" className={styles.navDivider}>
                            |
                          </Typography>
                      )}
                    </Box>
                );
              })}
            </Box>

            <IconButton onClick={onToggleTheme} className={styles.themeButton} disableRipple>
              <Box component="span" className={styles.themeIcon}>
                {mode === "dark" ? "\u2600" : "\u263D"}
              </Box>
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
  );
};