import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { setError } from "@/app/errorSlice";
import type {
  MovieCard,
  MovieDto,
  MovieList,
  MovieListDto,
  SearchMoviesArgs,
  MovieCredits,
  CreditsDto,
  DiscoverMoviesArgs,
} from "./tmdbApi.types";
import {
  MovieDtoSchema,
  MovieListDtoSchema,
  CreditsDtoSchema,
  GenresResponseSchema,
} from "./schemas/movieSchemas";

const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

const withDefaultParams = (params?: Record<string, string | number | boolean | undefined>) => ({
  language: "en-US",
  ...(tmdbApiKey ? { api_key: tmdbApiKey } : {}),
  ...params,
});

const mapMovie = (movie: MovieDto): MovieCard => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterPath: movie.poster_path,
  backdropPath: movie.backdrop_path,
  releaseDate: movie.release_date,
  voteAverage: movie.vote_average,
  runtime: movie.runtime,
  genres: movie.genres,
});

const mapMovieList = (response: MovieListDto): MovieList => ({
  page: response.page,
  results: response.results.map(mapMovie),
  totalPages: response.total_pages,
  totalResults: response.total_results,
});

const baseQueryWithErrorHandler = fetchBaseQuery({
  baseUrl: tmdbBaseUrl,
  prepareHeaders: (headers) => {
    if (tmdbToken) {
      headers.set("Authorization", `Bearer ${tmdbToken}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQueryWithErrorHandler(args, api, extraOptions);
  if (result.error) {
    const status = result.error.status;
    let message = "Something went wrong";

    if (status === "FETCH_ERROR" || status === 0) {
      message = "Network error. Check your internet connection.";
    } else if (status === 401) {
      message = "Invalid API key or token. Please check your credentials.";
    } else if (status === 404) {
      message = "Resource not found (404).";
    } else if (status >= 500) {
      message = "Server error. Please try again later.";
    }

    api.dispatch(setError(message));
  }
  return result;
};

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MovieList, number | undefined>({
      query: (page = 1) => ({
        url: "/movie/popular",
        params: withDefaultParams({ page }),
      }),
      transformResponse: (response: unknown) => {
        const validated = MovieListDtoSchema.parse(response);
        return mapMovieList(validated);
      },
    }),
    getTopRatedMovies: builder.query<MovieList, number | undefined>({
      query: (page = 1) => ({
        url: "/movie/top_rated",
        params: withDefaultParams({ page }),
      }),
      transformResponse: (response: unknown) => {
        const validated = MovieListDtoSchema.parse(response);
        return mapMovieList(validated);
      },
    }),
    getUpcomingMovies: builder.query<MovieList, number | undefined>({
      query: (page = 1) => ({
        url: "/movie/upcoming",
        params: withDefaultParams({ page }),
      }),
      transformResponse: (response: unknown) => {
        const validated = MovieListDtoSchema.parse(response);
        return mapMovieList(validated);
      },
    }),
    getNowPlayingMovies: builder.query<MovieList, number | undefined>({
      query: (page = 1) => ({
        url: "/movie/now_playing",
        params: withDefaultParams({ page }),
      }),
      transformResponse: (response: unknown) => {
        const validated = MovieListDtoSchema.parse(response);
        return mapMovieList(validated);
      },
    }),
    searchMovies: builder.query<MovieList, SearchMoviesArgs>({
      query: ({ query, page = 1 }) => ({
        url: "/search/movie",
        params: withDefaultParams({
          query,
          page,
          include_adult: false,
        }),
      }),
      transformResponse: (response: unknown) => {
        const validated = MovieListDtoSchema.parse(response);
        return mapMovieList(validated);
      },
    }),
    getMovieById: builder.query<MovieCard, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}`,
        params: withDefaultParams(),
      }),
      transformResponse: (response: unknown) => {
        const validated = MovieDtoSchema.parse(response);
        return mapMovie(validated);
      },
    }),
    getMovieCredits: builder.query<MovieCredits, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/credits`,
        params: withDefaultParams(),
      }),
      transformResponse: (response: unknown) => {
        const validated = CreditsDtoSchema.parse(response);
        return {
          cast: validated.cast.map((c) => ({
            id: c.id,
            name: c.name,
            character: c.character,
            profilePath: c.profile_path,
          })),
        };
      },
    }),
    getSimilarMovies: builder.query<MovieList, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/similar`,
        params: withDefaultParams(),
      }),
      transformResponse: (response: unknown) => {
        const validated = MovieListDtoSchema.parse(response);
        return mapMovieList(validated);
      },
    }),
    getGenres: builder.query<{ id: number; name: string }[], void>({
      query: () => ({
        url: "/genre/movie/list",
        params: withDefaultParams(),
      }),
      transformResponse: (response: unknown) => {
        const validated = GenresResponseSchema.parse(response);
        return validated.genres;
      },
    }),
    discoverMovies: builder.query<MovieList, DiscoverMoviesArgs>({
      query: (params) => ({
        url: "/discover/movie",
        params: withDefaultParams(params),
      }),
      transformResponse: (response: unknown) => {
        const validated = MovieListDtoSchema.parse(response);
        return mapMovieList(validated);
      },
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useGetGenresQuery,
  useDiscoverMoviesQuery,
} = tmdbApi;