import { Link } from "react-router-dom";
import Sparkline from "./Sparkline.jsx";
import PropTypes from "prop-types";

export default function AssetsCard({ assets, onSelect, selected }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Your Assets</h2>

        <Link
          to="/app/add"
          className="text-sm bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-1.5 rounded-md transition"
        >
          Buy / Sell
        </Link>
      </div>

      {/* List */}
      <div className="space-y-3">
        {assets.map((asset) => {
          const isPositive = asset.change24h >= 0;
          const isActive = selected === asset.coin_id;

          return (
            <button
              key={asset.coin_id}
              onClick={() => onSelect(asset.coin_id)}
              className={`w-full flex items-center justify-between gap-4 p-3 rounded-lg transition text-left
                ${
                  isActive
                    ? "bg-slate-800 border border-indigo-500/40"
                    : "hover:bg-slate-800"
                }`}
            >
              {/* Coin */}
              <div>
                <p className="font-medium uppercase">
                  {asset.coin_id}
                </p>
                <p className="text-sm text-slate-400">
                  {asset.quantity}
                </p>
              </div>

              {/* Sparkline */}
              <Sparkline
                data={asset.history}
                positive={isPositive}
              />

              {/* Value */}
              <div className="text-right">
                <p className="font-medium">
                  ${asset.value.toLocaleString()}
                </p>
                <p
                  className={`text-sm ${
                    isPositive
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {asset.change24h.toFixed(2)}%
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

AssetsCard.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      coin_id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      change24h: PropTypes.number,
      history: PropTypes.array,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
};
