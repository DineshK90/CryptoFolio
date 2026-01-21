import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAssetForm from "../components/dashboard/AddAssetForm";
import { fetchCoins } from "../services/coingecko";
import { fetchAssets, addAsset, updateAsset, deleteAsset } from "../services/api";

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

    const coinAssets = assets.filter(a => a.coin_id === coinId);
    const total = coinAssets.reduce((s, a) => s + Number(a.quantity), 0);

    if (mode === "sell") {
      if (amount > total) {
        alert(`You only own ${total}`);
        return;
      }

      let remaining = amount;

      for (const asset of coinAssets) {
        if (remaining <= 0) break;

        const qty = Number(asset.quantity);

        if (qty <= remaining) {
          await deleteAsset(asset.id);   // 🔥 REAL DELETE
          remaining -= qty;
        } else {
          await updateAsset(asset.id, qty - remaining);
          remaining = 0;
        }
      }
    } else {
      await addAsset(coinId, amount);
    }

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
