import mongoose from "mongoose";
import { config } from "./config.js";

export const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("Database connection established successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}