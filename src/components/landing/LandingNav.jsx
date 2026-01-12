import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
      <h1 className="text-xl font-semibold">CryptoFolio</h1>
      <div className="hidden md:flex items-center gap-6">
        <Link className="text-slate-300 hover:text-white">Features</Link>
        <Link className="text-slate-300 hover:text-white">How It Works</Link>
        <Link to="/login" className="text-slate-300 hover:text-white">Log In</Link>
        <Link
          to="/register"
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
