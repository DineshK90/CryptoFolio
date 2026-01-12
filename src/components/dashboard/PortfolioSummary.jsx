export default function PortfolioSummary() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p className="text-slate-400 text-sm">Total Portfolio Value</p>
        <h2 className="text-3xl font-semibold">$0.00</h2>
      </div>

      <div>
        <p className="text-slate-400 text-sm">24h Change</p>
        <p className="text-green-400 font-medium">+0.00%</p>
      </div>
    </div>
  );
}
