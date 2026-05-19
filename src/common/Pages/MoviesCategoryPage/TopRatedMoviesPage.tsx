import { useState } from "react";
import { Container, Pagination } from "@mui/material";
import { useGetTopRatedMoviesQuery } from "@/features/movies/api/tmdbApi";
import { MoviesSection } from "@/features/movies/ui/MoviesSection";
import { useLikedMovies } from "@/features/favorites/model/useLikedMovies";
import classes from "@/features/movies/ui/Movies.module.css";

export const TopRatedMoviesPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetTopRatedMoviesQuery(page);
    const { likedMovies, toggleLike, isLiked } = useLikedMovies();

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => setPage(value);

    return (
        <Container sx={{ mt: 3 }}>
            <MoviesSection
                title="Top Rated Movies"
                movies={data?.results}
                isError={isError}
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
        </Container>
    );
};