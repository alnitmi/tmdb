import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
    count: number;
}

const initialState: LoadingState = {
    count: 0,
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.count++;
        },
        stopLoading: (state) => {
            if (state.count > 0) state.count--;
        },
    },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;