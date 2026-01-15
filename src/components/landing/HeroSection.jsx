import { useEffect, useState } from "react";
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
        // Landing page always previews Bitcoin
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

  // Compute derived values safely
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
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto grid gap-16 md:grid-cols-2 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
            Track Your Crypto Portfolio
            <span className="block text-indigo-400">
              With Confidence
            </span>
          </h1>

          <p className="text-slate-400 text-lg mb-8 max-w-xl">
            Monitor your digital assets, visualize performance, and stay informed
            with real-time cryptocurrency market data.
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
              className="border border-slate-700 text-slate-200 hover:text-white px-8 py-3 rounded-md transition"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {loading ? (
            <div className="h-64 bg-slate-900 rounded-2xl animate-pulse" />
          ) : error || prices.length === 0 ? (
            <div className="h-64 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400">
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
      </div>
    </section>
  );
}
