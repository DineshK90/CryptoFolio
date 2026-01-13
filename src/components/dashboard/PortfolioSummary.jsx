export default function PortfolioSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Total Value */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
          Total Portfolio Value
        </p>
        <h2 className="text-4xl font-semibold tracking-tight">
          $0.00
        </h2>
      </div>

      {/* 24h Change */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
          24h Change
        </p>
        <p className="text-2xl font-medium text-green-400">
          +0.00%
        </p>
      </div>
    </div>
  );
}
