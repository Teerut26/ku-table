import { combineReducers } from "@reduxjs/toolkit";
import countSlice, { initialStateInterface } from "./slice/counterSlice";
import langSlice, { langInitialStateInterface } from "./slice/langSlice";

export interface RootState {
    countSlice: initialStateInterface;
    langSlice: langInitialStateInterface;
}

const rootReducer = combineReducers({
    countSlice: countSlice,
    langSlice: langSlice,
});

export default rootReducer;
