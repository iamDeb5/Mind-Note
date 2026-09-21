import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    archivedNotes: [],
    trashedNotes: [],
    loading: false,
    error: null,
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setArchivedNotes: (state, action) => {
            state.archivedNotes = action.payload;
        },
        setTrashedNotes: (state, action) => {
            state.trashedNotes = action.payload;
        },
        addNote: (state, action) => {
            state.notes.unshift(action.payload);
        },
        updateNoteInState: (state, action) => {
            const updated = action.payload;
            state.notes = state.notes.map((n) =>
                n._id === updated._id ? updated : n,
            );
            state.archivedNotes = state.archivedNotes.map((n) =>
                n._id === updated._id ? updated : n,
            );
            state.trashedNotes = state.trashedNotes.map((n) =>
                n._id === updated._id ? updated : n,
            );
        },
        removeNoteFromState: (state, action) => {
            const id = action.payload;
            const trashed = state.notes.find((n) => n._id === id);
            state.notes = state.notes.filter((n) => n._id !== id);
            state.archivedNotes = state.archivedNotes.filter((n) => n._id !== id);
            if (trashed) {
                state.trashedNotes.unshift({ ...trashed, trashed: true });
            }
        },
        togglePinInState: (state, action) => {
            const updated = action.payload;
            state.notes = state.notes.map((n) =>
                n._id === updated._id ? updated : n,
            );
        },
        toggleArchiveInState: (state, action) => {
            const updated = action.payload;
            if (updated.archive) {
                state.notes = state.notes.filter((n) => n._id !== updated._id);
                state.archivedNotes.unshift(updated);
            } else {
                state.archivedNotes = state.archivedNotes.filter(
                    (n) => n._id !== updated._id,
                );
                state.notes.unshift(updated);
            }
        },
        restoreNoteInState: (state, action) => {
            const restored = action.payload;
            state.trashedNotes = state.trashedNotes.filter(
                (n) => n._id !== restored._id,
            );
            if (restored.archive) {
                state.archivedNotes.unshift(restored);
            } else {
                state.notes.unshift(restored);
            }
        },
        removeNotePermanentlyInState: (state, action) => {
            const id = action.payload;
            state.trashedNotes = state.trashedNotes.filter((n) => n._id !== id);
        },
    },
});

export const {
    setLoading,
    setError,
    setNotes,
    setArchivedNotes,
    setTrashedNotes,
    addNote,
    updateNoteInState,
    removeNoteFromState,
    togglePinInState,
    toggleArchiveInState,
    restoreNoteInState,
    removeNotePermanentlyInState,
} = notesSlice.actions;

export default notesSlice.reducer;
