import { Link } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

const Home = () => {
  const { user, handleLogout, loading } = useAuth();

  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-900 font-['Inter',sans-serif] selection:bg-zinc-200 flex flex-col justify-between">
      {/* Responsive Navigation */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5 tracking-tight font-semibold text-base sm:text-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32]" />
          <span>Mind Note</span>
        </div>

        <nav className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          {user ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-zinc-500 text-xs hidden md:inline-block">
                {user.fullName || user.email}
              </span>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200/80 rounded-full transition-all cursor-pointer"
              >
                {loading ? "Logging out..." : "Log out"}
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-full transition-all shadow-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Responsive Hero Section */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-28 flex flex-col items-center text-center animate-fade-in">
        <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 sm:mb-8 rounded-full border border-zinc-200 bg-white/70 text-[11px] font-medium text-zinc-600 backdrop-blur-sm shadow-2xs hover:border-zinc-300 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32] animate-pulse" />
          Clarity for your thoughts
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.15] text-zinc-950 max-w-3xl">
          Write with focus. <br />
          <span className="font-serif italic font-normal text-zinc-600">
            Think in stillness.
          </span>
        </h1>

        <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-zinc-500 max-w-xl font-normal leading-relaxed px-2">
          An intentional, noise-free space designed for capturing your thoughts,
          organizing insights, and returning to calm clarity.
        </p>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-4 sm:px-0">
          {user ? (
            <div className="flex items-center w-full sm:w-auto">
              <Link
                to="/notes"
                className="w-full sm:w-auto px-7 py-3 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 active:scale-95 rounded-full transition-all shadow-sm text-center"
              >
                Open Notes
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 active:scale-95 rounded-full transition-all shadow-sm text-center"
              >
                Start Writing
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-7 py-3 text-sm font-medium text-zinc-700 bg-white hover:bg-zinc-100/80 active:scale-95 border border-zinc-200/80 rounded-full transition-all text-center"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Minimal Preview Card */}
        <div className="w-full mt-14 sm:mt-20 md:mt-24 max-w-2xl bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 text-left">
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-zinc-100 text-[11px] sm:text-xs text-zinc-400">
            <span>Today • 09:41 AM</span>
            <span className="w-2 h-2 rounded-full bg-zinc-200" />
          </div>
          <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-xl font-medium text-zinc-900 tracking-tight">
              On creative silence
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-light">
              Clear thinking requires quiet canvas. When every superficial
              distraction fades away, what remains is the pure essence of an
              idea waiting to be articulated.
            </p>
          </div>
        </div>
      </main>

      {/* Responsive Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 text-center sm:text-left">
        <p>© Mind Note. Crafted for uncluttered minds.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-zinc-600 transition-colors cursor-pointer">
            Privacy
          </span>
          <span className="hover:text-zinc-600 transition-colors cursor-pointer">
            Terms
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
