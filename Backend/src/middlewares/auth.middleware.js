import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { userModel } from "../models/user.model.js";
import cookieParser from "cookie-parser";


export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }

        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decodedToken._id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};