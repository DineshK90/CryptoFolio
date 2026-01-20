import { motion } from "framer-motion";

import stepAccount from "../../assets/landing/step-account.svg";
import stepAssets from "../../assets/landing/step-assets.svg";
import stepTrack from "../../assets/landing/step-track.svg";

const steps = [
  {
    title: "Create Your Account",
    desc: "Sign up securely using Firebase authentication to keep your portfolio private and protected.",
    img: stepAccount,
  },
  {
    title: "Add Your Crypto Assets",
    desc: "Select cryptocurrencies you own and enter quantities to start building your portfolio.",
    img: stepAssets,
  },
  {
    title: "Track Performance in Real Time",
    desc: "Monitor market movements, portfolio value, and performance trends with live data.",
    img: stepTrack,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 to-slate-900/40" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
            How CryptoFolio Works
          </h2>
          <p className="text-slate-400 text-lg">
            Get started in minutes with a simple, guided workflow.
          </p>
        </div>

        {/* Steps container */}
        <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl divide-y divide-slate-800 shadow-xl">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row items-center gap-6 p-8"
            >
              {/* Step number */}
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold">
                {idx + 1}
              </div>

              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-20 h-20 object-contain opacity-90"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
