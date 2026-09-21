import { noteModel } from "../models/note.model.js";


export const createNote = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const userId = req.user._id;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const note = await noteModel.create({
            title,
            content,
            user: userId,
            tags: tags || ["General"],
        });

        res.status(201).json({
            success: true,
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllNotes = async (req, res) => {
    try {
        const tag = req.query.tag;
        const search = req.query.search;
        const userId = req.user._id;
        const sort = req.query.sort;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        const filter = {
            user: userId,
            archive: false,
            trashed: false,
        }
        const skip = (page - 1) * limit;
        const sortOptions = { createdAt: -1 };

        if (sort === "pin") {
            sortOptions.pinned = -1;
        } else if (sort === "archive") {
            sortOptions.archive = -1;
        } else if (sort === "trash") {
            sortOptions.trashed = -1;
        }

        if (tag) {
            filter.tags = tag;
        }

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        if (sort === "pin") {
            filter.pinned = true;
        } else if (sort === "archive") {
            filter.archive = true;
        } else if (sort === "trash") {
            filter.trashed = true;
        } 

        if (search) {
            const regex = new RegExp(search, "i");
            const notes = await noteModel.find({ user: userId, archive: false, trashed: false, $or: [{ title: regex }, { content: regex }] }).sort(sortOptions).skip(skip).limit(limit);
            return res.status(200).json({
                success: true,
                notes
            });
        }
        const regex = new RegExp(search, "i");
        const notes = await noteModel.find({ user: userId, archive: false, trashed: false, $or: [{ title: regex }, { content: regex }] });
        res.status(200).json({
            success: true,
            notes
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getNote = async (req, res) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.id;

        const note = await noteModel.findOne({ _id: noteId, user: userId });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateNote = async (req, res) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.id;
        const { title, content, tags } = req.body;

        const note = await noteModel.findOne({ _id: noteId, user: userId });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        if (title) {
            note.title = title;
        }

        if (content) {
            note.content = content;
        }

        if (tags) {
            note.tags = tags;
        }

        await note.save();

        res.status(200).json({
            success: true,
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.id;

        const note = await noteModel.findOne({ _id: noteId, user: userId });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        note.trashed = true;
        await note.save();

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const pinNote = async (req, res) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.id;

        const note = await noteModel.findOne({ _id: noteId, user: userId });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        note.pinned = !note.pinned;
        await note.save();

        res.status(200).json({
            success: true,
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const archiveNote = async (req, res) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.id;

        const note = await noteModel.findOne({ _id: noteId, user: userId });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        note.archive = !note.archive;
        await note.save();

        res.status(200).json({
            success: true,
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getArchive = async (req, res) => {
    try {
        const userId = req.user._id;
        const notes = await noteModel.find({ user: userId, archive: true });

        res.status(200).json({
            success: true,
            notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getTrash = async (req, res) => {
    try {
        const userId = req.user._id;
        const notes = await noteModel.find({ user: userId, trashed: true });

        res.status(200).json({
            success: true,
            notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const restoreNote = async (req, res) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.id;

        const note = await noteModel.findOne({ _id: noteId, user: userId });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        note.trashed = false;
        await note.save();

        res.status(200).json({
            success: true,
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteNotePerm = async (req, res) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.id;

        const note = await noteModel.findOne({ _id: noteId, user: userId, trashed: true });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        await noteModel.deleteOne({ _id: noteId, user: userId });

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

