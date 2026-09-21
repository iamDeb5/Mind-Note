import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setError as setReduxError } from "../state/auth.slice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const { handleLogin, loading, error: reduxError } = useAuth();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (localError) setLocalError("");
    if (reduxError) dispatch(setReduxError(null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    dispatch(setReduxError(null));

    if (!formData.email.trim()) {
      setLocalError("Email is required");
      return;
    }
    if (!formData.password) {
      setLocalError("Password is required");
      return;
    }

    try {
      await handleLogin(formData.email.trim(), formData.password);
    } catch (err) {
      setLocalError(err.message || "Invalid credentials");
    }
  };

  const displayError = localError || reduxError;

  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-900 font-['Inter',sans-serif] flex flex-col justify-between px-4 sm:px-6 py-4">
      {/* Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-2 shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-semibold text-base sm:text-lg tracking-tight"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32]" />
          <span>Mind Note</span>
        </Link>
        <Link
          to="/register"
          className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          Need an account?{" "}
          <span className="font-medium text-zinc-900 underline underline-offset-4">
            Register
          </span>
        </Link>
      </header>

      {/* Main Form */}
      <main className="w-full max-w-md mx-auto my-auto py-4 sm:py-6 shrink-0">
        <div className="bg-white border border-zinc-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div className="mb-5 sm:mb-6 text-center">
            <h1 className="text-xl sm:text-2xl font-light tracking-tight text-zinc-950">
              Welcome back
            </h1>
            <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 font-normal">
              Enter your credentials to access your notes
            </p>
          </div>

          {displayError && (
            <div className="mb-4 p-2.5 bg-red-50/80 border border-red-100 text-red-600 text-xs rounded-xl text-center">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1 sm:mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 bg-[#fafaf9] border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                <label className="block text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] sm:text-[11px] text-zinc-400 hover:text-zinc-700 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#fafaf9] border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 sm:py-3 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white text-xs font-medium rounded-xl transition shadow-sm cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto py-2 text-center text-[11px] text-zinc-400 shrink-0">
        Mind Note • Quiet space for thought
      </footer>
    </div>
  );
};

export default Login;
