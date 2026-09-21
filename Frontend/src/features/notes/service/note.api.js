import axios from "axios";

const noteApi = axios.create({
    baseURL: "http://localhost:3000/api/notes",
    withCredentials: true,
});

const getErrorMessage = (error) => {
    return (
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred. Please try again."
    );
};

export const getAllNotesApi = async (params = {}) => {
    try {
        const result = await noteApi.get("/", { params });
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const getNoteApi = async (id) => {
    try {
        const result = await noteApi.get(`/${id}`);
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const createNoteApi = async ({ title, content, tags }) => {
    try {
        const result = await noteApi.post("/", { title, content, tags });
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const updateNoteApi = async (id, { title, content, tags }) => {
    try {
        const result = await noteApi.patch(`/${id}`, { title, content, tags });
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const deleteNoteApi = async (id) => {
    try {
        const result = await noteApi.delete(`/${id}`);
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const pinNoteApi = async (id) => {
    try {
        const result = await noteApi.patch(`/${id}/pin`);
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const archiveNoteApi = async (id) => {
    try {
        const result = await noteApi.patch(`/${id}/archive`);
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const getArchiveApi = async () => {
    try {
        const result = await noteApi.get("/archive");
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const getTrashApi = async () => {
    try {
        const result = await noteApi.get("/trash");
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const restoreNoteApi = async (id) => {
    try {
        const result = await noteApi.patch(`/${id}/restore`);
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const deleteNotePermApi = async (id) => {
    try {
        const result = await noteApi.patch(`/${id}/delete-perm`);
        return result.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};
