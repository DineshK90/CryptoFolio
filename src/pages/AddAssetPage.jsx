import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAssetForm from "../components/dashboard/AddAssetForm";
import { fetchCoins } from "../services/coingecko";

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
        setError("Failed to load coins. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadCoins();
  }, []);

  function handleAddAsset(e) {
    e.preventDefault();

    const coin = e.target.coin.value;
    const quantity = e.target.quantity.value;

    console.log("Asset added:", { coin, quantity });

    // Backend integration comes next
    navigate("/app");
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
