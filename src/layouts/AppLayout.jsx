import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/app" className="text-xl font-semibold">
            CryptoFolio
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/app"
              className="text-slate-300 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/app/profile"
              className="text-slate-300 hover:text-white"
            >
              Profile
            </Link>

            <span className="text-sm text-slate-400 hidden sm:inline">
              {user?.displayName}
            </span>

            <button
              onClick={handleLogout}
              className="text-sm text-red-400 hover:text-red-300"
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
