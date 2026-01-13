import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center max-w-lg mx-auto">
      <div className="mb-6">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xl">
          +
        </div>

        <h3 className="text-2xl font-semibold mb-2">
          Your portfolio is empty
        </h3>

        <p className="text-slate-400">
          Start tracking your crypto assets by adding your first asset.
        </p>
      </div>

      <Link
        to="/app/add"
        className="bg-indigo-500 hover:bg-indigo-400 text-white transition px-6 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        Add Your First Asset
      </Link>
    </div>
  );
}
