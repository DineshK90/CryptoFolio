import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAssetForm from "../components/dashboard/AddAssetForm";
import { fetchCoins } from "../services/coingecko";
import { fetchAssets, addAsset, updateAsset } from "../services/api";

export default function AddAssetPage() {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [coinList, assetList] = await Promise.all([
        fetchCoins(),
        fetchAssets(),
      ]);

      setCoins(coinList);
      setAssets(assetList);
      setLoading(false);
    }

    loadData();
  }, []);

  async function handleSubmit(e, mode) {
    e.preventDefault();

    const coinId = e.target.coin.value;
    const amount = Number(e.target.quantity.value);

    // Calculate total quantity across all records for this coin
    const totalQuantity = assets
      .filter((a) => a.coin_id === coinId)
      .reduce((sum, a) => sum + Number(a.quantity), 0);

    if (mode === "sell") {
      if (amount > totalQuantity) {
        alert(`Cannot sell more than you own. You have ${totalQuantity} available.`);
        return;
      }
    }

    // Always add a new transaction record (positive for buy, negative for sell)
    const transactionAmount = mode === "buy" ? amount : -amount;
    await addAsset(coinId, transactionAmount);

    navigate("/app");
  }

  return (
    <AddAssetForm
      coins={coins}
      assets={assets}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
}
