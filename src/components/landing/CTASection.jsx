import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-32 px-6 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        Start Tracking Your Crypto Portfolio Today
      </h2>

      <p className="text-slate-400 mb-8">
        Create a free account and begin monitoring your assets in minutes.
      </p>

      <Link
        to="/register"
        className="bg-indigo-500 hover:bg-indigo-400 px-10 py-4 rounded-md font-medium transition"
      >
        Get Started
      </Link>
    </section>
  );
}
