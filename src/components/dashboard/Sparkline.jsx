import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

export default function Sparkline({ data, positive }) {
  return (
    <div className="w-24 h-8">
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={positive ? "#22c55e" : "#ef4444"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
