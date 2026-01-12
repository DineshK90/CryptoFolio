import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAssetForm from "../components/dashboard/AddAssetForm";
import { fetchCoins } from "../services/coingecko";
import { addAsset } from "../services/api";

export default function AddAssetPage() {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCoins() {
      try {
        const data = await fetchCoins();
        setCoins(data);
} catch (err) {
  console.error(err);
  setError("Failed to load coins. Please try again.");
} finally {
        setLoading(false);
      }
    }

    loadCoins();
  }, []);

  async function handleAddAsset(e) {
    e.preventDefault();

    const coinId = e.target.coin.value;
    const quantity = Number(e.target.quantity.value);

    try {
      await addAsset(coinId, quantity);
      navigate("/app");
} catch (err) {
  console.error(err);
  setError("Failed to add asset. Please try again.");
}

  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <AddAssetForm
        coins={coins}
        loading={loading}
        onSubmit={handleAddAsset}
      />
    </div>
  );
}
