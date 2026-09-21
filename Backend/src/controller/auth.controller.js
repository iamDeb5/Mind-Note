import { config } from "../config/config.js";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const sendTokenResponse = async (user, statusCode, res) => {
    const token = jwt.sign({
        _id: user._id,
        email: user.email,
        fullName: user.fullName
    }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7
    });

    res.status(200).json({
        success: true,
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });
}


export const register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }


        const user = await userModel.create({
            fullName,
            email,
            password,
            confirmPassword
        });

        sendTokenResponse(user, 201, res);


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 0
        });

        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getMe = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "User fetched successfully",
        success: true,
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });
}

