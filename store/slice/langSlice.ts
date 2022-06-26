import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type langType = "th" | "en";

export interface langInitialStateInterface {
    data: langType;
}

const langSlice = createSlice({
    name: "lang",
    initialState: {
        data: "th",
    },
    reducers: {
        setlang(state, actions: PayloadAction<langType>) {
            state.data = actions.payload;
        },
    },
});

export const langActions = langSlice.actions;

export default langSlice.reducer;
