import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import ComparisonSection from "../components/landing/ComparisonSection";

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
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              See Your Portfolio Clearly
            </h2>

            <p className="text-slate-400 mb-6 max-w-md text-lg">
              CryptoFolio gives you a clear, focused view of your holdings —
              without unnecessary noise or distractions.
            </p>

            <ul className="space-y-3 text-slate-300 text-sm">
              <li>✓ Aggregated asset values</li>
              <li>✓ Real-time price updates</li>
              <li>✓ Clear gain & loss indicators</li>
              <li>✓ Designed for long-term clarity</li>
            </ul>
          </div>

          {/* Visual Placeholder */}
          <div className="relative">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl h-64 md:h-72 flex items-center justify-center text-slate-500 shadow-xl">
              Dashboard Preview
            </div>

            {/* subtle glow */}
            <div className="absolute inset-0 -z-10 bg-indigo-500/10 blur-2xl rounded-2xl" />
          </div>
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
