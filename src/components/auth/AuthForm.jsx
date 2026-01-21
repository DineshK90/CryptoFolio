import { motion } from "framer-motion";

export default function AuthForm({
  title,
  submitLabel,
  onSubmit,
  footerText,
  footerLinkText,
  footerLinkHref,
  showNameField = false,
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 w-full max-w-md shadow-2xl overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-indigo-500/30 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-500/30 rounded-bl-2xl" />

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          {title}
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-sm text-slate-400 text-center mb-8"
        >
          Secure access to your portfolio
        </motion.p>

        <motion.div variants={itemVariants} className="space-y-4">
          {showNameField && (
            <motion.div variants={itemVariants}>
              <label className="block text-sm mb-2 text-slate-300 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Alex Tan"
                className="w-full px-4 py-3 rounded-lg bg-slate-950/50 border border-slate-700/50 focus:border-indigo-500/50 focus:outline-none transition-colors backdrop-blur-sm text-slate-100 placeholder-slate-500"
              />
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <label className="block text-sm mb-2 text-slate-300 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-slate-950/50 border border-slate-700/50 focus:border-indigo-500/50 focus:outline-none transition-colors backdrop-blur-sm text-slate-100 placeholder-slate-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm mb-2 text-slate-300 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-slate-950/50 border border-slate-700/50 focus:border-indigo-500/50 focus:outline-none transition-colors backdrop-blur-sm text-slate-100 placeholder-slate-500"
            />
          </motion.div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 py-3 rounded-lg font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-indigo-500/50"
        >
          {submitLabel}
        </motion.button>

        <motion.p 
          variants={itemVariants}
          className="text-sm text-slate-400 text-center mt-6"
        >
          {footerText}{" "}
          <a
            href={footerLinkHref}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            {footerLinkText}
          </a>
        </motion.p>
      </motion.div>
    </form>
  );
}
