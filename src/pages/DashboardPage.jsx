import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PortfolioSummary from "../components/dashboard/PortfolioSummary";
import EmptyState from "../components/dashboard/EmptyState";
import { fetchAssets, deleteAsset } from "../services/api";

export default function DashboardPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAssets() {
      const data = await fetchAssets();
      setAssets(data);
      setLoading(false);
    }

    loadAssets();
  }, []);

  async function handleDelete(id) {
    await deleteAsset(id);
    setAssets((prev) => prev.filter((a) => a.id !== id));
  }

  if (loading) {
    return <p className="text-slate-400">Loading portfolio...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Portfolio Dashboard</h1>
        <Link
          to="/app/add"
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md"
        >
          Add Asset
        </Link>
      </div>

      <PortfolioSummary />

      {assets.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-lg">
          <table className="w-full text-left">
            <thead className="border-b border-slate-800">
              <tr>
                <th className="p-4">Coin</th>
                <th className="p-4">Quantity</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-slate-800">
                  <td className="p-4">{asset.coin_id}</td>
                  <td className="p-4">{asset.quantity}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(asset.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
