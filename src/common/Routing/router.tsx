import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "@/common/Pages/MainPage/MainPage";
import { MoviesLayout } from "@/common/Pages/MoviesCategoryPage/MoviesLayout";
import { PopularMoviesPage } from "@/common/Pages/MoviesCategoryPage/PopularMoviesPage";
import { TopRatedMoviesPage } from "@/common/Pages/MoviesCategoryPage/TopRatedMoviesPage";
import { UpcomingMoviesPage } from "@/common/Pages/MoviesCategoryPage/UpcomingMoviesPage";
import { NowPlayingMoviesPage } from "@/common/Pages/MoviesCategoryPage/NowPlayingMoviesPage";
import { SearchPage } from "@/common/Pages/SearchPage/SearchPage";
import { FavoritesPage } from "@/common/Pages/FavoritesPage/FavoritesPage";
import { FilteredMoviesPage } from "@/common/Pages/FilteredMoviesPage/FilteredMoviesPage";
import { MovieDetailsPage } from "@/common/Pages/MovieDetailsPage/MovieDetailsPage";
import { PageNotFound } from "@/common/components/PageNotFound/PageNotFound";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movies" element={<MoviesLayout />}>
                <Route index element={<Navigate to="/movies/popular" replace />} />
                <Route path="popular" element={<PopularMoviesPage />} />
                <Route path="top-rated" element={<TopRatedMoviesPage />} />
                <Route path="upcoming" element={<UpcomingMoviesPage />} />
                <Route path="now-playing" element={<NowPlayingMoviesPage />} />
            </Route>
            <Route path="/filtered-movies" element={<FilteredMoviesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};