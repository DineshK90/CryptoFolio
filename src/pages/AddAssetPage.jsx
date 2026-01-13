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

    const existing = assets.find((a) => a.coin_id === coinId);

    if (existing) {
      const newQuantity =
        mode === "buy"
          ? existing.quantity + amount
          : existing.quantity - amount;

      if (newQuantity < 0) {
        alert("Cannot sell more than you own");
        return;
      }

      await updateAsset(existing.id, newQuantity);
    } else {
      await addAsset(coinId, amount);
    }

    navigate("/app");
  }

  return (
    <AddAssetForm
      coins={coins}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
}
