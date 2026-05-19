import { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Pagination,
    Slider,
    Chip,
    Paper,
    Divider,
} from "@mui/material";
import { useGetGenresQuery, useDiscoverMoviesQuery } from "@/features/movies/api/tmdbApi";
import { MoviesSection } from "@/features/movies/ui/MoviesSection";
import { useLikedMovies } from "@/features/favorites/model/useLikedMovies";
import { useDebounce } from "@/common/Hooks/useDebounce";
import classes from "@/features/movies/ui/Movies.module.css";

const sortOptions = [
    { value: "popularity.desc", label: "Popularity ↓" },
    { value: "popularity.asc", label: "Popularity ↑" },
    { value: "vote_average.desc", label: "Rating ↓" },
    { value: "vote_average.asc", label: "Rating ↑" },
    { value: "release_date.desc", label: "Release Date ↓" },
    { value: "release_date.asc", label: "Release Date ↑" },
    { value: "original_title.asc", label: "A–Z" },
    { value: "original_title.desc", label: "Z–A" },
];

export const FilteredMoviesPage = () => {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>("popularity.desc");
    const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
    const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);

    const debouncedRating = useDebounce(ratingRange, 200);

    const { data: genresData } = useGetGenresQuery();
    const { toggleLike, isLiked } = useLikedMovies();

    const withGenres = selectedGenreIds.join(",");
    const hasRatingFilter = debouncedRating[0] !== 0 || debouncedRating[1] !== 10;

    const queryArgs = {
        sort_by: sortBy,
        page,
        ...(withGenres && { with_genres: withGenres }),
        ...(hasRatingFilter && {
            "vote_average.gte": debouncedRating[0],
            "vote_average.lte": debouncedRating[1],
        }),
    };

    const { data, isError } = useDiscoverMoviesQuery(queryArgs);

    const handleGenreToggle = (genreId: number) => {
        setSelectedGenreIds((prev) =>
            prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
        );
    };

    const handleReset = () => {
        setSortBy("popularity.desc");
        setSelectedGenreIds([]);
        setRatingRange([0, 10]);
        setPage(1);
    };

    useEffect(() => {
        setPage(1);
    }, [sortBy, selectedGenreIds, ratingRange]);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Filtered Movies
            </Typography>

            <Box sx={{ display: "flex", gap: 4 }}>
                <Box sx={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                            Filters
                        </Typography>

                        <Divider />

                        <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                                Genres
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1 }}>
                                {genresData?.map((genre) => (
                                    <Chip
                                        key={genre.id}
                                        label={genre.name}
                                        variant={selectedGenreIds.includes(genre.id) ? "filled" : "outlined"}
                                        color={selectedGenreIds.includes(genre.id) ? "primary" : "default"}
                                        onClick={() => handleGenreToggle(genre.id)}
                                        size="small"
                                        clickable
                                    />
                                ))}
                            </Box>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                                Rating
                            </Typography>
                            <Box sx={{ px: 1, pt: 1 }}>
                                <Slider
                                    value={ratingRange}
                                    onChange={(_, newValue) => setRatingRange(newValue as [number, number])}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={10}
                                    step={0.1}
                                    marks={[
                                        { value: 0, label: "0" },
                                        { value: 10, label: "10" },
                                    ]}
                                />
                            </Box>
                            <Typography variant="caption" color="text.disabled" sx={{ textAlign: "center", display: "block" }}>
                                {ratingRange[0]} – {ratingRange[1]}
                            </Typography>
                        </Box>

                        <Divider />

                        <FormControl size="small" fullWidth>
                            <InputLabel>Sort by</InputLabel>
                            <Select
                                value={sortBy}
                                label="Sort by"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                {sortOptions.map((opt) => (
                                    <MenuItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>

                    <Button
                        variant="outlined"
                        onClick={handleReset}
                        fullWidth
                        startIcon={<span>↺</span>}
                        sx={{ color: "text.primary", borderColor: "divider" }}
                    >
                        Reset filters
                    </Button>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <MoviesSection
                        title=""
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
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
                        />
                    )}
                </Box>
            </Box>
        </Container>
    );
};