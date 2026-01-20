import { useEffect, useState } from "react";
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
    async function loadDashboard() {
      const rawAssets = await fetchAssets();
      if (!rawAssets.length) {
        setPortfolio({ empty: true });
        return;
      }

      const coinIds = [...new Set(rawAssets.map(a => a.coin_id))];
      const prices = await fetchCoinPrices(coinIds);
      const aggregated = calculatePortfolio(rawAssets, prices);

      setPortfolio(aggregated);
      setSelectedCoin(aggregated.breakdown[0].coin_id);
    }

    loadDashboard();
  }, []);

  useEffect(() => {
    if (!selectedCoin) return;

    async function loadChart() {
      const data = await fetchCoinMarketChart(selectedCoin, range);
      setChartData(data);
    }

    loadChart();
  }, [selectedCoin, range]);

  if (!portfolio) {
    return <p className="text-slate-400">Loading...</p>;
  }

  if (portfolio.empty) {
    return <EmptyState />;
  }

  const avgChange =
    portfolio.breakdown.reduce((s, a) => s + a.change24h, 0) /
    portfolio.breakdown.length;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Top cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <AssetsCard
          assets={portfolio.breakdown}
          onSelect={setSelectedCoin}
          selected={selectedCoin}
        />

        <TotalValueCard
          totalValue={portfolio.totalValue}
          changePercent={avgChange}
        />
      </div>

      {/* Chart */}
      <CoinMarketChart
        data={chartData}
        coin={selectedCoin}
        range={range}
        onRangeChange={setRange}
      />
    </div>
  );
}
