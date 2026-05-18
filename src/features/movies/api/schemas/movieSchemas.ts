import { z } from "zod";

export const MovieDtoSchema = z.object({
    id: z.number(),
    title: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    release_date: z.string(),
    vote_average: z.number(),
    runtime: z.number().optional(),
    genres: z.array(z.object({ id: z.number(), name: z.string() })).optional(),
});

export const MovieListDtoSchema = z.object({
    page: z.number(),
    results: z.array(MovieDtoSchema),
    total_pages: z.number(),
    total_results: z.number(),
});

export const CreditsDtoSchema = z.object({
    cast: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            character: z.string(),
            profile_path: z.string().nullable(),
        })
    ),
});

export const GenresResponseSchema = z.object({
    genres: z.array(z.object({ id: z.number(), name: z.string() })),
});