import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pinned: {
        type: Boolean,
        default: false
    },
    archive: {
        type: Boolean,
        default: false
    },
    trashed: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true,
    }],

}, { timestamps: true });

export const noteModel = mongoose.model("Note", noteSchema);
