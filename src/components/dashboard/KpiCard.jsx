export default function KpiCard({ label, value, change }) {
  const isPositive = typeof change === "number" && change >= 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <p className="text-sm text-slate-400 mb-1">
        {label}
      </p>

      <p className="text-2xl font-semibold">
        {value}
      </p>

      {typeof change === "number" && (
        <p
          className={`text-sm mt-2 ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </p>
      )}
    </div>
  );
}
