import { useDispatch, useSelector } from "react-redux";
import {
    getAllNotesApi,
    getArchiveApi,
    getTrashApi,
    createNoteApi,
    updateNoteApi,
    deleteNoteApi,
    pinNoteApi,
    archiveNoteApi,
    restoreNoteApi,
    deleteNotePermApi,
} from "../service/note.api";
import {
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
} from "../state/notes.slice";

export const useNote = () => {
    const dispatch = useDispatch();
    const { notes, archivedNotes, trashedNotes, loading, error } = useSelector(
        (state) => state.notes,
    );

    const handleFetchNotes = async (params = {}) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const result = await getAllNotesApi(params);
            dispatch(setNotes(result.notes || []));
            return result.notes;
        } catch (err) {
            dispatch(setError(err.message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleFetchArchivedNotes = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const result = await getArchiveApi();
            dispatch(setArchivedNotes(result.notes || []));
            return result.notes;
        } catch (err) {
            dispatch(setError(err.message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleFetchTrashedNotes = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const result = await getTrashApi();
            dispatch(setTrashedNotes(result.notes || []));
            return result.notes;
        } catch (err) {
            dispatch(setError(err.message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCreateNote = async ({ title, content, tags }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const result = await createNoteApi({ title, content, tags });
            if (result.note) {
                dispatch(addNote(result.note));
            }
            return result.note;
        } catch (err) {
            dispatch(setError(err.message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleUpdateNote = async (id, payload) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const result = await updateNoteApi(id, payload);
            if (result.note) {
                dispatch(updateNoteInState(result.note));
            }
            return result.note;
        } catch (err) {
            dispatch(setError(err.message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            await deleteNoteApi(id);
            dispatch(removeNoteFromState(id));
        } catch (err) {
            dispatch(setError(err.message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handlePinNote = async (id) => {
        try {
            dispatch(setError(null));
            const result = await pinNoteApi(id);
            if (result.note) {
                dispatch(togglePinInState(result.note));
            }
            return result.note;
        } catch (err) {
            dispatch(setError(err.message));
            throw err;
        }
    };

    const handleArchiveNote = async (id) => {
        try {
            dispatch(setError(null));
            const result = await archiveNoteApi(id);
            if (result.note) {
                dispatch(toggleArchiveInState(result.note));
            }
            return result.note;
        } catch (err) {
            dispatch(setError(err.message));
            throw err;
        }
    };

    const handleRestoreNote = async (id) => {
        try {
            dispatch(setError(null));
            const result = await restoreNoteApi(id);
            if (result.note) {
                dispatch(restoreNoteInState(result.note));
            }
            return result.note;
        } catch (err) {
            dispatch(setError(err.message));
            throw err;
        }
    };

    const handleDeleteNotePerm = async (id) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            await deleteNotePermApi(id);
            dispatch(removeNotePermanentlyInState(id));
        } catch (err) {
            dispatch(setError(err.message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        notes,
        archivedNotes,
        trashedNotes,
        loading,
        error,
        handleFetchNotes,
        handleFetchArchivedNotes,
        handleFetchTrashedNotes,
        handleCreateNote,
        handleUpdateNote,
        handleDeleteNote,
        handlePinNote,
        handleArchiveNote,
        handleRestoreNote,
        handleDeleteNotePerm,
    };
};
