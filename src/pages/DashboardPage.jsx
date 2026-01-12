import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PortfolioSummary from "../components/dashboard/PortfolioSummary";
import EmptyState from "../components/dashboard/EmptyState";
import {
  fetchAssets,
  deleteAsset,
  updateAsset,
} from "../services/api";

export default function DashboardPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    async function loadAssets() {
      try {
        const data = await fetchAssets();
        setAssets(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteAsset(id);
      setAssets((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  function startEditing(asset) {
    setEditingId(asset.id);
    setEditValue(asset.quantity);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditValue("");
  }

  async function saveEdit(assetId) {
    try {
      const updated = await updateAsset(assetId, Number(editValue));

      setAssets((prev) =>
        prev.map((asset) =>
          asset.id === assetId ? updated : asset
        )
      );

      cancelEditing();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <p className="text-slate-400">Loading portfolio...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-slate-800">
              <tr>
                <th className="p-4">Coin</th>
                <th className="p-4">Quantity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-b border-slate-800"
                >
                  <td className="p-4">{asset.coin_id}</td>

                  <td className="p-4">
                    {editingId === asset.id ? (
                      <input
                        type="number"
                        step="any"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-24"
                      />
                    ) : (
                      asset.quantity
                    )}
                  </td>

                  <td className="p-4 text-right space-x-3">
                    {editingId === asset.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(asset.id)}
                          className="text-green-400 hover:text-green-300 text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-slate-400 hover:text-white text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(asset)}
                          className="text-indigo-400 hover:text-indigo-300 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(asset.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </>
                    )}
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
