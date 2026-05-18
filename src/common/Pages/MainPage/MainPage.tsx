import { skipToken } from "@reduxjs/toolkit/query";
import {
    Alert,
    Box,
    Button,
    Container,
    TextField,
    Typography,
    LinearProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
} from "@/features/movies/api/tmdbApi";
import { getImageUrl, movieSections } from "@/features/movies/model/movieModel";
import { useLikedMovies } from "@/features/favorites/model/useLikedMovies";
import { MoviesSection } from "@/features/movies/ui/MoviesSection";
import classes from "../../../features/movies/ui/Movies.module.css";

export const MainPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [heroSeed] = useState(() => Math.random());
    const navigate = useNavigate();

    const { likedMovies, toggleLike, isLiked } = useLikedMovies();

    const hasTmdbCredentials = Boolean(
        import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_TMDB_TOKEN
    );

    const popularQuery = useGetPopularMoviesQuery(hasTmdbCredentials ? undefined : skipToken);
    const topRatedQuery = useGetTopRatedMoviesQuery(hasTmdbCredentials ? undefined : skipToken);
    const upcomingQuery = useGetUpcomingMoviesQuery(hasTmdbCredentials ? undefined : skipToken);
    const nowPlayingQuery = useGetNowPlayingMoviesQuery(hasTmdbCredentials ? undefined : skipToken);

    const heroMovies = useMemo(
        () =>
            [
                ...(popularQuery.data?.results || []),
                ...(topRatedQuery.data?.results || []),
                ...(upcomingQuery.data?.results || []),
                ...(nowPlayingQuery.data?.results || []),
            ].filter((movie) => movie.backdropPath),
        [
            popularQuery.data?.results,
            topRatedQuery.data?.results,
            upcomingQuery.data?.results,
            nowPlayingQuery.data?.results,
        ],
    );

    const featuredMovie =
        heroMovies.length > 0 ? heroMovies[Math.floor(heroSeed * heroMovies.length)] : undefined;
    const heroBackdrop = getImageUrl(featuredMovie?.backdropPath || null, "original");
    const isSearchDisabled = !searchValue.trim();

    const theme = useTheme();
    const mode = theme.palette.mode;

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSearchDisabled) return;
        navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
    };

    return (
        <Box component="main" className={`${classes.main} ${mode === "light" ? classes.light : ""}`}>
            <Box
                className={`${classes.hero} ${!heroBackdrop ? classes.heroFallback : ""}`}
                style={heroBackdrop ? { backgroundImage: `url("${heroBackdrop}")` } : undefined}
            >
                <div className={classes.heroGradient} />
                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, px: { xs: 2, md: 3.5 } }}>
                    <Box className={classes.heroContent}>
                        <Typography component="h1" className={classes.heroTitle}>
                            WELCOME
                        </Typography>
                        <Typography className={classes.heroSubtitle}>
                            Browse highlighted titles from TMDB
                        </Typography>

                        <Box component="form" onSubmit={handleSearchSubmit} className={classes.searchForm}>
                            <TextField
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                placeholder="Search for a movie"
                                className={classes.searchField}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSearchDisabled}
                                className={classes.searchButton}
                            >
                                Search
                            </Button>
                        </Box>

                        {!hasTmdbCredentials && (
                            <Alert severity="warning" className={classes.credentialsAlert}>
                                Add `VITE_TMDB_API_KEY` or `VITE_TMDB_TOKEN` to `.env`.
                            </Alert>
                        )}
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3.5 } }}>
                <Box className={classes.sectionsContainer}>
                    <MoviesSection
                        title={movieSections[0].title}
                        movies={popularQuery.data?.results?.slice(0, 6)}
                        isLoading={popularQuery.isLoading}
                        isError={popularQuery.isError}
                        likedMovies={likedMovies}
                        isLiked={isLiked}
                        onToggleLike={toggleLike}
                        showViewMore
                        viewMoreLink="/movies/popular"
                    />
                    <MoviesSection
                        title={movieSections[1].title}
                        movies={topRatedQuery.data?.results?.slice(0, 6)}
                        isLoading={topRatedQuery.isLoading}
                        isError={topRatedQuery.isError}
                        likedMovies={likedMovies}
                        isLiked={isLiked}
                        onToggleLike={toggleLike}
                        showViewMore
                        viewMoreLink="/movies/top-rated"
                    />
                    <MoviesSection
                        title={movieSections[2].title}
                        movies={upcomingQuery.data?.results?.slice(0, 6)}
                        isLoading={upcomingQuery.isLoading}
                        isError={upcomingQuery.isError}
                        likedMovies={likedMovies}
                        isLiked={isLiked}
                        onToggleLike={toggleLike}
                        showViewMore
                        viewMoreLink="/movies/upcoming"
                    />
                    <MoviesSection
                        title={movieSections[3].title}
                        movies={nowPlayingQuery.data?.results?.slice(0, 6)}
                        isLoading={nowPlayingQuery.isLoading}
                        isError={nowPlayingQuery.isError}
                        likedMovies={likedMovies}
                        isLiked={isLiked}
                        onToggleLike={toggleLike}
                        showViewMore
                        viewMoreLink="/movies/now-playing"
                    />
                </Box>
            </Container>
        </Box>
    );
};