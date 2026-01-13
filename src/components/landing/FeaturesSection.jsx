const features = [
  {
    title: "Live Market Data",
    desc: "Real-time cryptocurrency prices powered by CoinGecko.",
  },
  {
    title: "Secure Accounts",
    desc: "Private portfolios protected by modern authentication.",
  },
  {
    title: "Responsive Design",
    desc: "Optimized for both desktop and mobile experiences.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 px-6">
      {/* Section header */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Everything You Need to Track Your Portfolio
        </h3>
        <p className="text-slate-400 text-lg">
          Built with the tools and features that matter most to crypto investors.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-slate-900 rounded-xl p-8 border border-slate-800 shadow-sm hover:shadow-md transition"
          >
            <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-lg font-semibold mb-6">
              ✓
            </div>

            <h4 className="text-xl font-medium mb-2">
              {feature.title}
            </h4>

            <p className="text-slate-400 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
