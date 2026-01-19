import { Outlet, Link } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Public Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight hover:opacity-90 transition"
          >
            <span className="text-indigo-400">Crypto</span>Folio
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
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
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-md text-sm font-medium transition"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile CTA */}
          <div className="md:hidden">
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="px-6 py-16">
        <Outlet />
      </main>
    </div>
  );
}
