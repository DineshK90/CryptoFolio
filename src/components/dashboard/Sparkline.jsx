import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

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

Sparkline.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
    })
  ).isRequired,
  positive: PropTypes.bool.isRequired,
};
