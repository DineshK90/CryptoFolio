import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-12 text-center">
      <h3 className="text-xl font-semibold mb-2">
        Your portfolio is empty
      </h3>
      <p className="text-slate-400 mb-6">
        Start tracking your crypto assets by adding your first asset.
      </p>

      <Link
        to="/app/add"
        className="inline-block bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-md font-medium"
      >
        Add Your First Asset
      </Link>
    </div>
  );
}
