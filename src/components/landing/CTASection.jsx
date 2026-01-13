import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative py-32 px-6 bg-slate-950 text-center overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Start Tracking Your Crypto Portfolio Today
        </h3>

        <p className="text-slate-400 text-lg mb-10">
          Create a free account and begin monitoring your assets in minutes.
        </p>

        <Link
          to="/register"
          className="inline-flex items-center justify-center bg-indigo-500 hover:bg-indigo-400 text-white transition px-8 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
