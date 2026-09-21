import axios from "axios";

const authApi = axios.create({
	baseURL: "https://mind-note-ogr7.onrender.com/api/auth",
	withCredentials: true,
});

const getErrorMessage = (error) => {
	return (
		error.response?.data?.message ||
		error.message ||
		"An unexpected error occurred. Please try again."
	);
};

// Register API Call
export const registerApi = async ({ email, password, fullName, confirmPassword }) => {
	try {
		const result = await authApi.post("/register", {
			email,
			password,
			fullName,
			confirmPassword,
		});
		return result.data;
	} catch (error) {
		console.error("Registration Error:", error);
		throw new Error(getErrorMessage(error));
	}
};

// Login API Call
export const loginApi = async ({ email, password }) => {
	try {
		const result = await authApi.post("/login", { email, password });
		return result.data;
	} catch (error) {
		console.error("Login Error:", error);
		throw new Error(getErrorMessage(error));
	}
};

// Logout API Call
export const logoutApi = async () => {
	try {
		const result = await authApi.post("/logout");
		return result.data;
	} catch (error) {
		console.error("Logout Error:", error);
		throw new Error(getErrorMessage(error));
	}
};

// Get Me API Call
export const getMeApi = async () => {
	try {
		const result = await authApi.get("/me");
		return result.data;
	} catch (error) {
		console.error("Get Me Error:", error);
		throw new Error(getErrorMessage(error));
	}
};
