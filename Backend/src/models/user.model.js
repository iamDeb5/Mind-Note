import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required"],
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: 6
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm Password is required"],
        trim: true,
        minlength: 6
    },

}, { timestamps: true });


userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});



export const userModel = mongoose.model("User", userSchema);