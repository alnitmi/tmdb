import { Box, Button, Chip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import type { MovieCard as MovieCardType } from "@/features/movies/api/tmdbApi.types";
import { getImageUrl } from "@/features/movies/model/movieModel";
import type { LikedMovie } from "@/features/favorites/model/useLikedMovies";
import classes from "@/features/movies/ui/Movies.module.css";

type MoviePosterCardProps = {
    movie: MovieCardType;
    liked: boolean;
    onToggleLike: (movie: LikedMovie) => void;
};

export const MoviePosterCard = ({ movie, liked, onToggleLike }: MoviePosterCardProps) => {
    const posterUrl = getImageUrl(movie.posterPath);
    const formattedRating = movie.voteAverage ? movie.voteAverage.toFixed(1) : "0.0";
    const theme = useTheme();
    const mode = theme.palette.mode;

    const getRatingClass = () => {
        const rating = movie.voteAverage ?? 0;
        if (rating >= 7.5) return classes.ratingHigh;
        if (rating >= 5) return classes.ratingMedium;
        return classes.ratingLow;
    };

    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleLike({
            id: movie.id,
            title: movie.title,
            posterPath: movie.posterPath,
            voteAverage: movie.voteAverage,
        });
    };

    return (
        <Box className={`${classes.movieCard} ${mode === "light" ? classes.light : ""}`}>
            <Box component={RouterLink} to={`/movie/${movie.id}`} sx={{ textDecoration: "none" }}>
                <Box className={classes.posterWrapper}>
                    {posterUrl ? (
                        <Box
                            component="img"
                            src={posterUrl}
                            alt={movie.title}
                            className={classes.posterImage}
                        />
                    ) : (
                        <Box className={classes.noPoster}>
                            <Typography variant="h6" className={classes.noPosterTitle}>
                                {movie.title}
                            </Typography>
                        </Box>
                    )}

                    <Button
                        onClick={handleLikeClick}
                        className={`${classes.favoriteButton} ${liked ? classes.favoriteButtonLiked : ""}`}
                    >
                        <Box component="span" className={classes.favIcon}>
                            {liked ? "\u2665" : "\u2661"}
                        </Box>
                    </Button>

                    <Chip
                        label={formattedRating}
                        className={`${classes.ratingChip} ${getRatingClass()}`}
                    />
                </Box>
                <Typography className={classes.movieTitle}>{movie.title}</Typography>
            </Box>
        </Box>
    );
};