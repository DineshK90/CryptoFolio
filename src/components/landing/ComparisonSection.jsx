export default function ComparisonSection() {
  return (
    <section className="py-32 px-6 bg-slate-950/60">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          Built for Clarity, Not Complexity
        </h2>

        <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
          CryptoFolio focuses on the essentials — giving you insight without unnecessary noise.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Typical Trackers */}
          <div className="bg-slate-900 border border-red-900/30 rounded-2xl p-8">
            <h3 className="text-lg font-medium mb-6 text-slate-300">
              Typical Crypto Trackers
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl shrink-0">✕</span>
                <span className="text-slate-400">Overloaded dashboards</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl shrink-0">✕</span>
                <span className="text-slate-400">Hard-to-read portfolio summaries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl shrink-0">✕</span>
                <span className="text-slate-400">Limited performance context</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-xl shrink-0">✕</span>
                <span className="text-slate-400">Poor mobile experience</span>
              </li>
            </ul>
          </div>

          {/* CryptoFolio */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8">
            <h3 className="text-lg font-medium mb-6 text-white">
              CryptoFolio
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                <span className="text-slate-200">Clean, focused portfolio insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                <span className="text-slate-200">Real-time market data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                <span className="text-slate-200">Clear performance tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                <span className="text-slate-200">Designed for desktop and mobile</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
