import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tmdbApi } from "@/features/movies/api/tmdbApi";
import errorReducer from "./errorSlice";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tmdbApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;