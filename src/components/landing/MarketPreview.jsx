import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const ranges = [
  { label: "7D", value: 7 },
  { label: "30D", value: 30 },
  { label: "90D", value: 90 },
];

export default function MarketPreview({
  prices,
  currentPrice,
  changePercent,
  selectedRange,
  onRangeChange,
}) {
  const isPositive = changePercent >= 0;

  return (
    <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-slate-400">
            Bitcoin · Last {selectedRange} Days
          </p>
          <p className="text-2xl font-semibold">
            ${currentPrice.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {ranges.map((range) => (
            <button
              key={range.value}
              onClick={() => onRangeChange(range.value)}
              className={`px-3 py-1 text-xs rounded-md transition ${
                selectedRange === range.value
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Change */}
      <div
        className={`text-sm mb-4 ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}
      >
        {isPositive ? "+" : ""}
        {changePercent}% over {selectedRange} days
      </div>

      {/* Chart */}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={prices}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

            <XAxis
              dataKey="time"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickFormatter={(v) => `$${v.toLocaleString()}`}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={80}
            />

            <Tooltip
              formatter={(v) => [`$${v.toLocaleString()}`, "Price"]}
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#94a3b8" }}
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
    </div>
  );
}
