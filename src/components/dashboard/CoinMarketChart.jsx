import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CoinMarketChart({
  data,
  coin,
  onCoinChange,
  options,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">
          Market Chart
        </h2>

        <select
          value={coin}
          onChange={(e) => onCoinChange(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-md px-3 py-1 text-sm"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
  <ResponsiveContainer width="100%" aspect={3}>
    <LineChart data={data}>
      <XAxis dataKey="time" hide />
      <YAxis
        tickFormatter={(v) => `$${v.toLocaleString()}`}
      />
      <Tooltip
        formatter={(v) => `$${v.toLocaleString()}`}
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
