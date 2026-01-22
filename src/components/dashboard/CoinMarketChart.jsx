import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import PropTypes from "prop-types";

const ranges = [
  { label: "7D", value: 7 },
  { label: "30D", value: 30 },
  { label: "90D", value: 90 },
];

export default function CoinMarketChart({
  data,
  coin,
  range,
  onRangeChange,
  loading = false,
}) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-lg font-medium">
          {coin?.toUpperCase()} Price Chart
        </h2>

        {/* Range Selector */}
        <div className="flex gap-2">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => onRangeChange(r.value)}
              className={`px-3 py-1 text-sm rounded-md transition
                ${
                  range === r.value
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[260px]">
        {loading ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm">
            Loading chart…
          </div>
        ) : hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

              <XAxis
                dataKey="time"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
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
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]?.payload?.fullDate) {
                    return payload[0].payload.fullDate;
                  }
                  return label;
                }}
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
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm">
            No market data available for this range.
          </div>
        )}
      </div>
    </div>
  );
}

CoinMarketChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string,
      price: PropTypes.number,
      fullDate: PropTypes.string,
    })
  ).isRequired,
  coin: PropTypes.string,
  range: PropTypes.number.isRequired,
  onRangeChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
