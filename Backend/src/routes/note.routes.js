import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { createNote, getAllNotes, getNote, updateNote, deleteNote, pinNote, archiveNote, getArchive, getTrash, restoreNote, deleteNotePerm } from "../controller/note.controller.js";

const router = express.Router();

/**
 * POST /api/notes
 * Create a new note
 */
router.post("/", protectedRoute, createNote);
/**
 * GET /api/notes
 * Get all notes
 */
router.get("/", protectedRoute, getAllNotes);
/**
 * GET /api/notes/archive
 * Get all archived notes
 */
router.get("/archive", protectedRoute, getArchive);

/**
 * GET /api/notes/trash
 * Get all trashed notes
 */
router.get("/trash", protectedRoute, getTrash);

/**
 * GET /api/notes/:id
 * Get a note by id
 */
router.get("/:id", protectedRoute, getNote);
/**
 * PATCH /api/notes/:id
 * Update a note by id
 */
router.patch("/:id", protectedRoute, updateNote);
/**
 * DELETE /api/notes/:id
 * Delete a note by id
 */
router.delete("/:id", protectedRoute, deleteNote);

/**
 * PATCH /api/notes/:id/pin
 * Pin a note
 */
router.patch("/:id/pin", protectedRoute, pinNote);

/**
 * PATCH /api/notes/:id/archive
 * Archive a note
 */
router.patch("/:id/archive", protectedRoute, archiveNote);

/**
 * PATCH /api/notes/:id/restore
 * Restore a note
 */
router.patch("/:id/restore", protectedRoute, restoreNote);

/**
 * PATCH /api/notes/:id/delete-perm
 * Permanently delete a note
 */
router.patch("/:id/delete-perm", protectedRoute, deleteNotePerm);







export const noteRoutes = router;
