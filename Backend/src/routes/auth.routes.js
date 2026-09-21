import express from "express";
import { register, login, logout, getMe } from "../controller/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();


/**
 * POST /api/auth/register
 * Register a new user
 */
router.post("/register", register);

/**
 * POST /api/auth/login
 * Login a user
 */
router.post("/login", login);

/**
 * POST /api/auth/logout
 * Logout a user
 */
router.post("/logout", protectedRoute, logout);

/**
 * GET /api/auth/me
 * Get current user
 */
router.get("/me", protectedRoute, getMe);


export const authRoutes = router;
