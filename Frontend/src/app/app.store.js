import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice.js";
import notesReducer from "../features/notes/state/notes.slice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: notesReducer,
    },
});

export default store;
