import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AppLayout() {
  const { user } = useAuth();

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand (IMPORTANT FIX HERE) */}
          <Link
            to="/app"
            className="text-xl font-semibold tracking-tight hover:opacity-90 transition"
          >
            <span className="text-indigo-400">Crypto</span>Folio
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            <Link
              to="/app"
              className="text-sm text-slate-300 hover:text-white transition"
            >
              Dashboard
            </Link>

            <Link
              to="/app/profile"
              className="text-sm text-slate-300 hover:text-white transition"
            >
              Profile
            </Link>

            {user?.displayName && (
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                {user.displayName}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-red-400 transition focus:outline-none"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
