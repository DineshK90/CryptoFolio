import { Outlet, Link } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Public Navbar */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight hover:opacity-90 transition"
          >
            <span className="text-indigo-400">Crypto</span>Folio
          </Link>

          {/* Actions */}
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm text-slate-300 hover:text-white transition"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="text-sm text-slate-300 hover:text-white transition"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex items-center justify-center px-6 py-16">
        <Outlet />
      </main>
    </div>
  );
}
