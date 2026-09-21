import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes.js";
import { noteRoutes } from "./routes/note.routes.js";
import cookieParser from "cookie-parser";
const app = express();

/**
 * Middleware
 */
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./public"));

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

export default app;
