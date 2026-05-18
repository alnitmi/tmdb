export interface MovieDto {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime?: number;
  genres?: { id: number; name: string }[];
}

export interface MovieCard {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  runtime?: number;
  genres?: { id: number; name: string }[];
}

export interface MovieListDto {
  page: number;
  results: MovieDto[];
  total_pages: number;
  total_results: number;
}

export interface MovieList {
  page: number;
  results: MovieCard[];
  totalPages: number;
  totalResults: number;
}

export interface SearchMoviesArgs {
  query: string;
  page?: number;
}

export interface CreditsDto {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
}

export interface MovieCredits {
  cast: {
    id: number;
    name: string;
    character: string;
    profilePath: string | null;
  }[];
}

export interface DiscoverMoviesArgs {
  sort_by?: string;
  with_genres?: string;
  page?: number;
  "vote_count.gte"?: number;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
}