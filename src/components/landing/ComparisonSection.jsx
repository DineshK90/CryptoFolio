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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h3 className="text-lg font-medium mb-6 text-slate-300">
              Typical Crypto Trackers
            </h3>

            <ul className="space-y-4 text-slate-400">
              <li>✕ Overloaded dashboards</li>
              <li>✕ Hard-to-read portfolio summaries</li>
              <li>✕ Limited performance context</li>
              <li>✕ Poor mobile experience</li>
            </ul>
          </div>

          {/* CryptoFolio */}
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-8">
            <h3 className="text-lg font-medium mb-6 text-white">
              CryptoFolio
            </h3>

            <ul className="space-y-4 text-slate-200">
              <li>✓ Clean, focused portfolio insights</li>
              <li>✓ Real-time market data</li>
              <li>✓ Clear performance tracking</li>
              <li>✓ Designed for desktop and mobile</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
