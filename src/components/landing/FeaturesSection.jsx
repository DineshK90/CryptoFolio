import { motion } from "framer-motion";

import marketImg from "../../assets/landing/feature-market.svg";
import securityImg from "../../assets/landing/feature-security.svg";
import insightsImg from "../../assets/landing/feature-insights.svg";

const features = [
  {
    title: "Live Market Data",
    desc: "Track real-time cryptocurrency prices powered by CoinGecko with accurate, up-to-date market information.",
    img: marketImg,
  },
  {
    title: "Portfolio Insights",
    desc: "Understand total value, asset allocation, and performance trends at a glance — without clutter.",
    img: insightsImg,
  },
  {
    title: "Secure Accounts",
    desc: "Private portfolios protected by Firebase authentication and modern security best practices.",
    img: securityImg,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-24 px-6"
    >
      {/* Background separator */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950" />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Everything You Need to Track Your Portfolio
            </span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg">
            Built with the tools and features that matter most to modern crypto
            investors.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-3">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40"
            >
              {/* Image area */}
              <div className="relative h-44 md:h-48 bg-slate-950 flex items-center justify-center">
                <img
                  src={f.img}
                  alt={f.title}
                  className="h-24 w-auto opacity-90 transition-transform duration-300 group-hover:scale-105"
                />

                {/* Subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2 tracking-tight">
                  {f.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>

              {/* Hover accent */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
