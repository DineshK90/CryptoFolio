import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MarketPreview({
  prices = [],
  currentPrice,
  changePercent,
  selectedRange,
  onRangeChange,
}) {
  const isPositive = Number(changePercent) >= 0;

  // 🔒 Guard: do not render chart if no data
  if (!prices.length || currentPrice == null) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400">
        Loading market data…
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Bitcoin Price</p>
          <p className="text-2xl font-semibold">
            ${currentPrice.toLocaleString()}
          </p>
        </div>

        {changePercent != null && (
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {changePercent}%
          </span>
        )}
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={prices}>
            <XAxis
              dataKey="time"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#94a3b8" }}
              formatter={(value) => [`$${value}`, "Price"]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Range selector */}
      <div className="flex gap-2">
        {[7, 30, 90].map((range) => (
          <button
            key={range}
            onClick={() => onRangeChange(range)}
            className={`px-3 py-1 rounded-md text-sm transition ${
              selectedRange === range
                ? "bg-indigo-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {range}D
          </button>
        ))}
      </div>
    </div>
  );
}
