const features = [
  { title: "Live Market Data", desc: "Real-time prices powered by CoinGecko." },
  { title: "Secure Accounts", desc: "Private portfolios protected by authentication." },
  { title: "Responsive Design", desc: "Optimized for desktop and mobile devices." }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-slate-900">
      <h3 className="text-3xl font-semibold text-center mb-12">
        Everything You Need to Track Your Portfolio
      </h3>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f) => (
          <div key={f.title} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h4 className="text-xl font-medium mb-2">{f.title}</h4>
            <p className="text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
