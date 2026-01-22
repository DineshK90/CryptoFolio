import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [portfolio, setPortfolio] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState(7);
  const [loading, setLoading] = useState(true);
  const [chartError, setChartError] = useState(false);

  // Reload whenever we return from Buy/Sell
  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);

        const rawAssets = await fetchAssets();
        if (!mounted) return;

        if (!rawAssets.length) {
          setPortfolio({ empty: true });
          setLoading(false);
          return;
        }

        const coinIds = [...new Set(rawAssets.map(a => a.coin_id))];
        const prices = await fetchCoinPrices(coinIds);
        if (!mounted) return;

        const aggregated = calculatePortfolio(rawAssets, prices);

        if (!aggregated.breakdown.length) {
          setPortfolio({ empty: true });
          setLoading(false);
          return;
        }

        setPortfolio(aggregated);
        setSelectedCoin(prev =>
          aggregated.breakdown.find(a => a.coin_id === prev)?.coin_id ||
          aggregated.breakdown[0].coin_id
        );

      } catch (err) {
        console.error("Dashboard load failed:", err);
        setPortfolio({ empty: true });
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadDashboard();
    return () => (mounted = false);
  }, [location.key]);

  // Load chart when coin or range changes
  useEffect(() => {
    if (!selectedCoin) return;
    let mounted = true;

    async function loadChart() {
      try {
        setChartError(false);
        const data = await fetchCoinMarketChart(selectedCoin, range);
        if (!mounted) return;

        if (data.length) {
          setChartData(data);
          setChartError(false);
        } else {
          // Keep previous series if new data is empty (rate limits or CG hiccups)
          setChartError(true);
          setChartData((prev) => prev);
        }
      } catch (err) {
        console.error("Chart load failed:", err);
        if (mounted) setChartError(true);
      }
    }

    loadChart();
    return () => (mounted = false);
  }, [selectedCoin, range]);

  if (loading || !portfolio) {
    return <p className="text-slate-400">Loading portfolio…</p>;
  }

  if (portfolio.empty) {
    return <EmptyState />;
  }

  const avgChange =
    portfolio.breakdown.reduce((s, a) => s + (a.change24h || 0), 0) /
    Math.max(portfolio.breakdown.length, 1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
      {/* Decorative background */}
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
          loading={loading}
        />
      </motion.div>
    </motion.div>
  );
}
