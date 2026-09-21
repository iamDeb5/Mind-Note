import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { authRoutes } from "./routes/auth.routes.js";
import { noteRoutes } from "./routes/note.routes.js";
import cookieParser from "cookie-parser";
const app = express();
const publicPath = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../public",
);

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
app.use(express.static(publicPath));

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
	if (req.method !== "GET" || req.path.startsWith("/api/")) {
		return next();
	}

	return res.sendFile(path.join(publicPath, "index.html"));
});

export default app;
