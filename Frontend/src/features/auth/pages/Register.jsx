import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setError as setReduxError } from "../state/auth.slice";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const { handleRegister, loading, error: reduxError } = useAuth();
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

    if (!formData.fullName.trim()) {
      setLocalError("Full name is required");
      return;
    }
    if (!formData.email.trim()) {
      setLocalError("Email is required");
      return;
    }
    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      await handleRegister({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
    } catch (err) {
      setLocalError(err.message || "Registration failed");
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
          to="/login"
          className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          Already have an account?{" "}
          <span className="font-medium text-zinc-900 underline underline-offset-4">
            Sign in
          </span>
        </Link>
      </header>

      {/* Main Form Container */}
      <main className="w-full max-w-md mx-auto my-auto py-3 sm:py-4 shrink-0">
        <div className="bg-white border border-zinc-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div className="mb-4 text-center">
            <h1 className="text-xl sm:text-2xl font-light tracking-tight text-zinc-950">
              Create an account
            </h1>
            <p className="text-[11px] text-zinc-400 mt-1 font-normal">
              Begin capturing your thoughts with quiet focus
            </p>
          </div>

          {displayError && (
            <div className="mb-3 p-2 bg-red-50/80 border border-red-100 text-red-600 text-xs rounded-xl text-center">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-wider text-zinc-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-3.5 py-2 bg-[#fafaf9] border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-medium uppercase tracking-wider text-zinc-400 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2 bg-[#fafaf9] border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] text-zinc-400 hover:text-zinc-700 cursor-pointer"
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
                className="w-full px-3.5 py-2 bg-[#fafaf9] border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-medium uppercase tracking-wider text-zinc-400 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 bg-[#fafaf9] border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1.5 py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white text-xs font-medium rounded-xl transition shadow-sm cursor-pointer"
            >
              {loading ? "Creating account..." : "Create Account"}
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

export default Register;
