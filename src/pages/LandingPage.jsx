import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import ComparisonSection from "../components/landing/ComparisonSection";
import dashboardPreview from "../assets/dashboard/dashboard-preview.png";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* HERO */}
      <HeroSection />

      {/* TRUST / CREDIBILITY STRIP */}
      <section className="py-10 border-t border-b border-slate-800 bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-slate-400">
          <span>Powered by CoinGecko</span>
          <span>Firebase Authentication</span>
          <span>Neon PostgreSQL</span>
          <span>Secure by Design</span>
        </div>
      </section>

      {/* FEATURES */}
      <FeaturesSection />

      {/* MID-PAGE PRODUCT HIGHLIGHT */}
      <section className="relative py-28 px-6 overflow-hidden">
        {/* Fintech background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl -z-10" />
        
        {/* Tech grid overlay */}
        <div className="absolute inset-0 opacity-5 -z-10" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(99, 102, 241, 0.1) 25%, rgba(99, 102, 241, 0.1) 26%, transparent 27%, transparent 74%, rgba(99, 102, 241, 0.1) 75%, rgba(99, 102, 241, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(99, 102, 241, 0.1) 25%, rgba(99, 102, 241, 0.1) 26%, transparent 27%, transparent 74%, rgba(99, 102, 241, 0.1) 75%, rgba(99, 102, 241, 0.1) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }} />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block mb-4"
            >
              <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30">
                ✨ Real-Time Portfolio Tracking
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
                See Your Portfolio
              </span>
              <span className="block text-white mt-2">Clearly</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-300 mb-8 max-w-md text-lg leading-relaxed"
            >
              CryptoFolio gives you a clear, focused view of your holdings — without unnecessary noise or distractions.
            </motion.p>

            <motion.ul 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              {[
                { icon: "📊", text: "Aggregated asset values" },
                { icon: "⚡", text: "Real-time price updates" },
                { icon: "📈", text: "Clear gain & loss indicators" },
                { icon: "🎯", text: "Designed for long-term clarity" }
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-3 text-slate-300 text-sm group"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="group-hover:text-indigo-400 transition-colors">{item.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10" />
            
            {/* Inner animated border */}
            <div className="absolute inset-0 rounded-2xl border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors duration-300" />
            
            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm bg-slate-900/30 border border-slate-700/50 shadow-2xl">
              <img
                src={dashboardPreview}
                alt="Dashboard Preview"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300 pointer-events-none" />
            </div>

            {/* Tech accent bars */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-indigo-500/50 rounded-tr-2xl"
            />
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-purple-500/50 rounded-bl-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* COMPARISON */}
      <ComparisonSection />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* CTA */}
      <CTASection />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
