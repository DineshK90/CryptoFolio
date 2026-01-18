import { motion } from "framer-motion";

const features = [
  {
    title: "Live Market Data",
    desc: "Real-time cryptocurrency prices powered by CoinGecko.",
    icon: "📈",
  },
  {
    title: "Secure Accounts",
    desc: "Private portfolios protected by Firebase authentication.",
    icon: "🔐",
  },
  {
    title: "Responsive Design",
    desc: "Optimized for desktop and mobile devices.",
    icon: "📱",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold text-center mb-4"
        >
          Everything You Need to Track Your Portfolio
        </motion.h2>

        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
          Built with the tools and features that matter most to crypto investors.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 hover:opacity-100 transition pointer-events-none" />

              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-medium mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
