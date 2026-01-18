import { motion } from "framer-motion";

const steps = [
  {
    title: "Create an Account",
    desc: "Sign up securely using Firebase authentication.",
    icon: "👤",
  },
  {
    title: "Add Your Assets",
    desc: "Track cryptocurrencies and enter quantities you own.",
    icon: "➕",
  },
  {
    title: "Monitor Performance",
    desc: "See portfolio value and live market updates instantly.",
    icon: "📊",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold text-center mb-4"
        >
          How CryptoFolio Works
        </motion.h2>

        <p className="text-slate-400 text-center mb-16">
          Get started in minutes with a simple, guided workflow.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl p-6 text-center shadow-lg"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl font-semibold">
                {idx + 1}
              </div>

              <div className="text-3xl mb-4">{step.icon}</div>

              <h3 className="font-medium mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
