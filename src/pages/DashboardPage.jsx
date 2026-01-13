import { useEffect, useState } from "react";
import AssetsCard from "../components/dashboard/AssetsCard";
import TotalValueCard from "../components/dashboard/TotalValueCard";
import CoinMarketChart from "../components/dashboard/CoinMarketChart";
import { fetchAssets } from "../services/api";
import { fetchCoinPrices } from "../services/prices";
import { fetchBitcoinMarketChart } from "../services/market";
import { calculatePortfolio } from "../utils/portfolio";

export default function DashboardPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const rawAssets = await fetchAssets();

        if (rawAssets.length === 0) {
          setPortfolio(null);
          setLoading(false);
          return;
        }

        // 🔴 THIS IS THE ONLY PLACE RAW ASSETS EXIST
        const coinIds = [...new Set(rawAssets.map(a => a.coin_id))];

        const prices = await fetchCoinPrices(coinIds);
        const aggregated = calculatePortfolio(rawAssets, prices);

        setPortfolio(aggregated);
        setSelectedCoin(aggregated.breakdown[0].coin_id);

console.log("AGGREGATED:", aggregated.breakdown);
        const market = await fetchBitcoinMarketChart(7);
        setChartData(market.prices);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  async function handleCoinChange(coinId) {
    setSelectedCoin(coinId);
    const market = await fetchBitcoinMarketChart(7);
    setChartData(market.prices);
  }

  if (loading) {
    return <p className="text-slate-400">Loading dashboard…</p>;
  }

  if (!portfolio) {
    return <p className="text-slate-400">No assets yet.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* TOP CARDS */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 🔴 THIS MUST USE portfolio.breakdown */}
        <AssetsCard assets={portfolio.breakdown} />

        <TotalValueCard
          totalValue={portfolio.totalValue}
          changePercent={
            portfolio.breakdown.reduce(
              (sum, a) => sum + a.change24h,
              0
            ) / portfolio.breakdown.length
          }
        />
      </div>

      {/* MARKET CHART */}
      <CoinMarketChart
        data={chartData}
        coin={selectedCoin}
        onCoinChange={handleCoinChange}
        options={portfolio.breakdown.map(a => a.coin_id)}
      />
    </div>
  );
}

