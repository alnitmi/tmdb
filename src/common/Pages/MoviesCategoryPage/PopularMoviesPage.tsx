import { useState } from "react";
import { Container, Pagination, LinearProgress } from "@mui/material";
import { useGetPopularMoviesQuery } from "@/features/movies/api/tmdbApi";
import { MoviesSection } from "@/features/movies/ui/MoviesSection";
import { useLikedMovies } from "@/features/favorites/model/useLikedMovies";
import classes from "@/features/movies/ui/Movies.module.css";

export const PopularMoviesPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetPopularMoviesQuery(page);
    const { likedMovies, toggleLike, isLiked } = useLikedMovies();

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => setPage(value);

    return (
        <Container sx={{ mt: 3 }}>
            {isLoading && <LinearProgress sx={{ mt: 2 }} />}
            {!isLoading && (
                <>
                    <MoviesSection
                        title="Popular Movies"
                        movies={data?.results}
                        isLoading={false}
                        isError={isError}
                        likedMovies={likedMovies}
                        isLiked={isLiked}
                        onToggleLike={toggleLike}
                        showViewMore={false}
                        gridClassName={classes.gridCategories}
                    />
                    {data && data.totalPages > 1 && (
                        <Pagination
                            count={data.totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
                        />
                    )}
                </>
            )}
        </Container>
    );
};