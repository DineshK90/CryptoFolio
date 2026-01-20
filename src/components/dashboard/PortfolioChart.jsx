import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function PortfolioChart({ data }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <p className="text-lg font-medium mb-4">
        Portfolio Value
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" aspect={2.5}>
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
              formatter={(v) => [`$${v.toLocaleString()}`, "Value"]}
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
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
