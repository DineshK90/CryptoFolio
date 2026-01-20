import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddAssetForm({
  coins,
  assets = [],
  loading,
  onSubmit,
  existingAsset,
}) {
  const [mode, setMode] = useState("buy"); // buy | sell
  const [selectedCoin, setSelectedCoin] = useState("");

  // Calculate total holdings for selected coin
  const currentHoldings = assets
    .filter((a) => a.coin_id === selectedCoin)
    .reduce((sum, a) => sum + Number(a.quantity), 0);

  return (
    <form
      onSubmit={(e) => onSubmit(e, mode)}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full mx-auto shadow-xl"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">
          Update Holdings
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Buy or sell cryptocurrency to adjust your portfolio
        </p>
      </div>

      {/* Buy / Sell Toggle */}
      <div className="flex gap-2 mb-6">
        {["buy", "sell"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setMode(type)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              mode === type
                ? type === "buy"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            {type === "buy" ? "Buy" : "Sell"}
          </button>
        ))}
      </div>

      {/* Coin */}
      <div className="mb-6">
        <label className="block text-sm text-slate-400 mb-1">
          Cryptocurrency
        </label>

        <select
          name="coin"
          required
          disabled={loading || !!existingAsset}
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-slate-950 border border-slate-800"
        >
          <option value="">
            Select a coin
          </option>

          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} ({coin.symbol.toUpperCase()})
            </option>
          ))}
        </select>

        {selectedCoin && currentHoldings > 0 && (
          <p className="text-xs text-indigo-400 mt-2">
            Current holdings: {currentHoldings.toFixed(8)} {coins.find(c => c.id === selectedCoin)?.symbol.toUpperCase()}
          </p>
        )}
      </div>

      {/* Quantity */}
      <div className="mb-8">
        <label className="block text-sm text-slate-400 mb-1">
          Amount
        </label>
        <input
          type="number"
          name="quantity"
          step="0.00000001"
          min="0"
          required
          placeholder="e.g. 0.025"
          className="w-full px-4 py-2 rounded-md bg-slate-950 border border-slate-800"
        />
        <p className="text-xs text-slate-500 mt-1">
          Supports up to 8 decimal places
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-md font-medium"
        >
          Confirm
        </button>

        <Link
          to="/app"
          className="border border-slate-700 text-slate-300 hover:text-white px-6 py-2 rounded-md"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
