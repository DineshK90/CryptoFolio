import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AssetsCard from "../components/dashboard/AssetsCard";
import TotalValueCard from "../components/dashboard/TotalValueCard";
import CoinMarketChart from "../components/dashboard/CoinMarketChart";
import EmptyState from "../components/dashboard/EmptyState";
import { fetchAssets } from "../services/api";
import { fetchCoinPrices } from "../services/prices";
import { fetchCoinMarketChart } from "../services/market";
import { calculatePortfolio } from "../utils/portfolio";

export default function DashboardPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState(7);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const rawAssets = await fetchAssets();
        if (!mounted) return;

        if (!rawAssets.length) {
          setPortfolio({ empty: true });
          return;
        }

        const coinIds = [...new Set(rawAssets.map(a => a.coin_id))];

        // 🔒 Safe price fetch
        const prices = await fetchCoinPrices(coinIds);
        if (!mounted) return;

        console.log("📊 Dashboard Debug:", {
          rawAssets: rawAssets.length,
          coinIds,
          prices,
          priceKeys: Object.keys(prices || {})
        });

        const aggregated = calculatePortfolio(rawAssets, prices);

        // If all holdings were filtered out (zero quantities), show empty state
        if (!aggregated.breakdown.length) {
          setPortfolio({ empty: true });
          return;
        }

        setPortfolio(aggregated);
        setSelectedCoin(aggregated.breakdown[0].coin_id);

      } catch (err) {
        console.error("Dashboard load failed:", err);
        setPortfolio({ empty: true });
      }
    }

    loadDashboard();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (!selectedCoin) return;
    let mounted = true;

    async function loadChart() {
      try {
        const data = await fetchCoinMarketChart(selectedCoin, range);
        if (mounted) setChartData(data);
      } catch (err) {
        console.error("Chart load failed:", err);
      }
    }

    loadChart();
    return () => (mounted = false);
  }, [selectedCoin, range]);

  if (!portfolio) {
    return <p className="text-slate-400">Loading portfolio…</p>;
  }

  if (portfolio.empty) {
    return <EmptyState />;
  }

  const avgChange =
    portfolio.breakdown.length > 0
      ? portfolio.breakdown.reduce((s, a) => s + a.change24h, 0) /
        portfolio.breakdown.length
      : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="relative max-w-6xl mx-auto space-y-10 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
        <AssetsCard
          assets={portfolio.breakdown}
          onSelect={setSelectedCoin}
          selected={selectedCoin}
        />

        <TotalValueCard
          totalValue={portfolio.totalValue}
          changePercent={avgChange}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CoinMarketChart
          data={chartData}
          coin={selectedCoin}
          range={range}
          onRangeChange={setRange}
        />
      </motion.div>
    </motion.div>
  );
}
