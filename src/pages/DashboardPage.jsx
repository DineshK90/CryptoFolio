import { Link } from "react-router-dom";
import PortfolioSummary from "../components/dashboard/PortfolioSummary";
import EmptyState from "../components/dashboard/EmptyState";
// import AssetTable from "../components/dashboard/AssetTable";

export default function DashboardPage() {
  // Temporary placeholder — will be replaced by backend data
  const assets = [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Portfolio Dashboard
        </h1>

        <Link
          to="/app/add"
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md font-medium"
        >
          Add Asset
        </Link>
      </div>

      {/* Portfolio Summary */}
      <PortfolioSummary />

      {/* Portfolio Content */}
      {assets.length === 0 ? (
        <EmptyState />
      ) : (
        // <AssetTable assets={assets} />
        null
      )}
    </div>
  );
}
