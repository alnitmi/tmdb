import { Container, Typography, Box } from "@mui/material";
import { MoviePosterCard } from "@/features/movies/ui/MoviePosterCard";
import { useLikedMovies } from "@/features/favorites/model/useLikedMovies";

export const FavoritesPage = () => {
    const { likedMovies, toggleLike, isLiked } = useLikedMovies();

    if (likedMovies.length === 0) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>Your Favorite Movies</Typography>
                <Typography>No favorite movies yet.</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Your Favorite Movies</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px" }}>
                {likedMovies.map((movie) => (
                    <MoviePosterCard
                        key={movie.id}
                        movie={{
                            id: movie.id,
                            title: movie.title,
                            posterPath: movie.posterPath,
                            voteAverage: movie.voteAverage,
                            overview: "",
                            backdropPath: null,
                            releaseDate: "",
                            genres: [],
                        }}
                        liked={isLiked(movie.id)}
                        onToggleLike={toggleLike}
                    />
                ))}
            </Box>
        </Container>
    );
};