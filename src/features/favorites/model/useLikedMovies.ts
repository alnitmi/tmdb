import { useState, useEffect } from "react";

export interface LikedMovie {
    id: number;
    title: string;
    posterPath: string | null;
    voteAverage: number;
}

const STORAGE_KEY = "likedMovies";

export function useLikedMovies() {
    const [likedMovies, setLikedMovies] = useState<LikedMovie[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(likedMovies));
    }, [likedMovies]);

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                setLikedMovies(JSON.parse(e.newValue));
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const toggleLike = (movie: LikedMovie) => {
        setLikedMovies((prev) => {
            const exists = prev.some((m) => m.id === movie.id);
            return exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
        });
    };

    const isLiked = (id: number) => likedMovies.some((m) => m.id === id);

    return { likedMovies, toggleLike, isLiked };
}