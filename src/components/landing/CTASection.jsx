import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-24 px-6 text-center bg-slate-900">
      <h3 className="text-3xl font-bold mb-4">
        Start Tracking Your Crypto Portfolio Today
      </h3>

      <p className="text-slate-400 mb-8">
        Create a free account and begin monitoring your assets in minutes.
      </p>

      <Link
        to="/register"
        className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-md font-medium inline-block"
      >
        Get Started
      </Link>
    </section>
  );
}
