import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MarketPreview from "./MarketPreview";
import { fetchCoinMarketChart } from "../../services/market";

export default function HeroSection() {
  const [prices, setPrices] = useState([]);
  const [selectedRange, setSelectedRange] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadMarket() {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchCoinMarketChart("bitcoin", selectedRange);
        setPrices(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadMarket();
  }, [selectedRange]);

  const currentPrice =
    prices.length > 0 ? prices[prices.length - 1].price : null;

  const changePercent =
    prices.length > 1
      ? (
          ((prices[prices.length - 1].price - prices[0].price) /
            prices[0].price) *
          100
        ).toFixed(2)
      : null;

  return (
    <section className="relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />

      {/* Soft glow accents */}
      <div className="absolute -top-48 -left-48 w-[420px] h-[420px] bg-indigo-600/20 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-48 -right-48 w-[420px] h-[420px] bg-blue-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-28 grid md:grid-cols-2 gap-14 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Track Your Crypto Portfolio
            <span className="block text-indigo-400 mt-1">
              With Confidence
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-xl mb-8">
            Monitor your assets, visualize performance, and stay informed
            with real-time cryptocurrency market data — all in one clean,
            focused dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-md font-medium transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-slate-700 px-8 py-3 rounded-md text-slate-300 hover:text-white transition"
            >
              Log In
            </Link>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl p-4 shadow-xl">
            {loading ? (
              <div className="h-64 animate-pulse bg-slate-800 rounded-xl" />
            ) : error || !prices.length ? (
              <div className="h-64 flex items-center justify-center text-slate-400">
                Failed to load market data
              </div>
            ) : (
              <MarketPreview
                prices={prices}
                currentPrice={currentPrice}
                changePercent={changePercent}
                selectedRange={selectedRange}
                onRangeChange={setSelectedRange}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
