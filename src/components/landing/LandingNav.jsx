import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          <span className="text-indigo-400">Crypto</span>Folio
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            How It Works
          </a>

          <Link
            to="/login"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Log In
          </Link>

          <Link
            to="/register"
            className="bg-indigo-500 hover:bg-indigo-400 text-white transition px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
