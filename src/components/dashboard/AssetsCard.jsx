import { Link } from "react-router-dom";

export default function AssetsCard({ assets }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">
          Your Assets
        </h2>

        <Link
          to="/app/add"
          className="text-sm bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-1.5 rounded-md transition whitespace-nowrap"
        >
          Buy / Sell
        </Link>
      </div>

      {/* Asset List */}
      <div className="space-y-4">
        {assets.length === 0 && (
          <p className="text-sm text-slate-400">
            You don’t own any assets yet.
          </p>
        )}

        {assets.map((asset) => {
          const isPositive = asset.change24h >= 0;

          return (
            <div
              key={asset.coin_id}
              className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-slate-800 transition"
            >
              {/* Left: Coin & Quantity */}
              <div>
                <p className="font-medium uppercase tracking-wide">
                  {asset.coin_id}
                </p>
                <p className="text-sm text-slate-400">
                  {asset.quantity}
                </p>
              </div>

              {/* Right: Value & Change */}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
