import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function AppLayout() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link
              to="/app"
              className="text-lg sm:text-xl font-semibold tracking-tight hover:opacity-90 transition shrink-0"
            >
              <span className="text-indigo-400">Crypto</span>Folio
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5">
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

                  <span className="hidden lg:inline text-sm text-slate-300">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
              <div className="flex flex-col gap-4">
                <Link
                  to="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-slate-300 hover:text-white transition py-2"
                >
                  Dashboard
                </Link>

                <Link
                  to="/app/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-slate-300 hover:text-white transition py-2"
                >
                  Profile
                </Link>

                {/* User Info */}
                {user && (
                  <div className="flex items-center gap-3 py-2 border-t border-slate-800 pt-4">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-slate-700 object-cover"
                        style={{ imageRendering: "auto" }}
                      />
                    )}
                    <span className="text-sm text-slate-300">
                      {user.displayName}
                    </span>
                  </div>
                )}

                {/* Logout */}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm text-slate-400 hover:text-red-400 transition focus:outline-none text-left py-2"
                >
                  Log out
                </button>
              </div>
            </nav>
          )}
        </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
