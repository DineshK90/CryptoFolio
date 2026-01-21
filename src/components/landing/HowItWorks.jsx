import { motion } from "framer-motion";

const steps = [
  {
    title: "Create Your Account",
    desc: "Sign up securely using Firebase authentication to keep your portfolio private and protected.",
    icon: "🔐",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Add Your Crypto Assets",
    desc: "Select cryptocurrencies you own and enter quantities to start building your portfolio.",
    icon: "💰",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Track Performance in Real Time",
    desc: "Monitor market movements, portfolio value, and performance trends with live data.",
    icon: "📈",
    color: "from-purple-500 to-pink-500",
  },
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
      {/* Fintech background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl -z-10" />
      <div className="absolute inset-0 opacity-5 -z-10" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(99, 102, 241, 0.1) 25%, rgba(99, 102, 241, 0.1) 26%, transparent 27%, transparent 74%, rgba(99, 102, 241, 0.1) 75%, rgba(99, 102, 241, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(99, 102, 241, 0.1) 25%, rgba(99, 102, 241, 0.1) 26%, transparent 27%, transparent 74%, rgba(99, 102, 241, 0.1) 75%, rgba(99, 102, 241, 0.1) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-4"
          >
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30">
              ⚡ Simple Workflow
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              How CryptoFolio Works
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            Get started in minutes with a simple, guided workflow. Three easy steps to take control of your portfolio.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 h-full shadow-xl overflow-hidden transition-all duration-300 hover:border-indigo-500/40">
                {/* Decorative background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />

                {/* Top accent corner */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-indigo-500/20 rounded-tr-2xl" />

                {/* Step number with gradient background */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-lg`}
                >
                  <span className="text-3xl">{step.icon}</span>
                </motion.div>

                {/* Step counter */}
                <div className="absolute top-6 right-8 text-xs font-bold text-slate-500 opacity-50">
                  STEP {idx + 1}
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-3 text-slate-100">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-1 h-12 bg-gradient-to-b from-indigo-500/50 to-transparent rounded-r" />
              </div>

              {/* Connecting line (hidden on mobile) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-500/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 rounded-2xl p-8 md:p-12 text-center overflow-hidden"
        >
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -z-10" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -z-10" />

          <h3 className="text-2xl font-bold mb-3 text-slate-100">
            Ready to get started?
          </h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Join thousands of crypto investors who are already using CryptoFolio to track and optimize their portfolios with confidence.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/register"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
          >
            Create Account Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
