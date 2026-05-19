import { Box, Button, Typography, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import type { MovieCard as MovieCardType } from "@/features/movies/api/tmdbApi.types";
import { MoviePosterCard } from "@/features/movies/ui/MoviePosterCard";
import type { LikedMovie } from "@/features/favorites/model/useLikedMovies";
import classes from "@/features/movies/ui/Movies.module.css";

type MoviesSectionProps = {
    title: string;
    movies?: MovieCardType[];
    isError: boolean;
    isLiked: (id: number) => boolean;
    onToggleLike: (movie: LikedMovie) => void;
    showViewMore?: boolean;
    viewMoreLink?: string;
    gridClassName?: string;
};

export const MoviesSection = ({
                                  title,
                                  movies,
                                  isError,
                                  isLiked,
                                  onToggleLike,
                                  showViewMore = false,
                                  viewMoreLink = "#",
                                  gridClassName,
                              }: MoviesSectionProps) => {
    const theme = useTheme();
    const mode = theme.palette.mode;

    return (
        <Box className={`${classes.section} ${mode === "light" ? classes.light : ""}`}>
            <Box className={classes.sectionHeader}>
                <Typography variant="h4" className={classes.sectionTitle}>
                    {title}
                </Typography>
                {showViewMore && (
                    <Button
                        component={RouterLink}
                        to={viewMoreLink}
                        variant="outlined"
                        className={classes.sectionViewMore}
                    >
                        View more
                    </Button>
                )}
            </Box>

            {!isError && movies && movies.length > 0 && (
                <Box className={`${classes.grid} ${gridClassName ?? ""}`}>
                    {movies.map((movie) => (
                        <MoviePosterCard
                            key={movie.id}
                            movie={movie}
                            liked={isLiked(movie.id)}
                            onToggleLike={onToggleLike}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};