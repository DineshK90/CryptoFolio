import AnimatedNumber from "../ui/AnimatedNumber";
import PropTypes from "prop-types";

export default function TotalValueCard({
  totalValue,
  changePercent,
}) {
  const isPositive = changePercent >= 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-medium mb-2">
        Total Portfolio Value
      </h2>

      <p className="text-3xl font-semibold mb-2">
        <AnimatedNumber value={totalValue} />
      </p>

      <p
        className={`text-sm ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}
      >
        {isPositive ? "+" : ""}
        {changePercent.toFixed(2)}% (24h)
      </p>
    </div>
  );
}

TotalValueCard.propTypes = {
  totalValue: PropTypes.number.isRequired,
  changePercent: PropTypes.number.isRequired,
};
