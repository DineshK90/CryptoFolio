import { motion } from "framer-motion";

import marketImg from "../../assets/landing/feature-market.svg";
import securityImg from "../../assets/landing/feature-security.svg";
import insightsImg from "../../assets/landing/feature-insights.svg";

const features = [
  {
    title: "Live Market Data",
    desc: "Track real-time cryptocurrency prices powered by CoinGecko.",
    img: marketImg,
  },
  {
    title: "Portfolio Insights",
    desc: "See total portfolio value, asset allocation, and performance at a glance.",
    img: insightsImg,
  },
  {
    title: "Secure Accounts",
    desc: "Private portfolios protected by Firebase authentication.",
    img: securityImg,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          Everything You Need to Track Your Portfolio
        </h2>

        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-20">
          Built with the tools and features that matter most to crypto investors.
        </p>

        <div className="grid gap-12 md:grid-cols-3">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
  src={f.img}
  alt={f.title}
  className="w-full h-40 md:h-48 object-cover bg-slate-950"
/>

              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
