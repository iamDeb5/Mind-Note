import { useDispatch, useSelector } from "react-redux";
import {
    loginApi,
    registerApi,
    getMeApi,
    logoutApi,
} from "../service/auth.api";
import { setUser, setLoading, setError } from "../state/auth.slice";
import { useNavigate } from "react-router";

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    const handleLogin = async (credentials, maybePassword) => {
        const email =
            typeof credentials === "object" ? credentials.email : credentials;
        const password =
            typeof credentials === "object"
                ? credentials.password
                : maybePassword;

        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const result = await loginApi({ email, password });
            dispatch(setUser(result.user));
            navigate("/");
            return result;
        } catch (err) {
            const message = err.message || "Login failed";
            dispatch(setError(message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleRegister = async (
        data,
        maybePassword,
        maybeFullName,
        maybeConfirmPassword,
    ) => {
        const payload =
            typeof data === "object"
                ? data
                : {
                      email: data,
                      password: maybePassword,
                      fullName: maybeFullName,
                      confirmPassword: maybeConfirmPassword,
                  };

        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const result = await registerApi(payload);
            dispatch(setUser(result.user));
            navigate("/");
            return result;
        } catch (err) {
            const message = err.message || "Registration failed";
            dispatch(setError(message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleLogout = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            await logoutApi();
            dispatch(setUser(null));
            navigate("/login");
        } catch (err) {
            const message = err.message || "Logout failed";
            dispatch(setError(message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCheckUser = async () => {
        try {
            dispatch(setLoading(true));
            const result = await getMeApi();
            dispatch(setUser(result.user));
            return result.user;
        } catch (err) {
            dispatch(setUser(null));
            return null;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        user,
        loading,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
        handleCheckUser,
    };
};
