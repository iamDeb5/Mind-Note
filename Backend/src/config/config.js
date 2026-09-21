import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!PORT) {
    throw new Error("Port is not defined");
}
if (!MONGO_URI) {
    throw new Error("MongoDB URI is not defined");
}
if (!JWT_SECRET) {
    throw new Error("JWT Secret is not defined");
}
if (!JWT_EXPIRES_IN) {
    throw new Error("JWT Expires In is not defined");
}

export const config = {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN
}