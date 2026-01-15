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
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Brand */}
          <Link
            to="/app"
            className="text-xl font-semibold tracking-tight hover:opacity-90 transition"
          >
            <span className="text-indigo-400">Crypto</span>Folio
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-5">
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

            {/* Avatar + Name */}
            {user && (
              <div className="flex items-center gap-2">
                {user.photoURL && (
                  <img
  src={user.photoURL}
  alt="Profile"
  className="w-8 h-8 rounded-full border border-slate-700 object-cover"
  style={{ imageRendering: "auto" }}
/>

                )}

                <span className="hidden sm:inline text-sm text-slate-300">
                  {user.displayName}
                </span>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-red-400 transition focus:outline-none"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
