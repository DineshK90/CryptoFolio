export function calculatePortfolio(assets, prices) {
  const grouped = {};

  // 1️⃣ Group by coin
  for (const asset of assets) {
    if (!grouped[asset.coin_id]) {
      grouped[asset.coin_id] = {
        coin_id: asset.coin_id,
        quantity: 0,
      };
    }

    grouped[asset.coin_id].quantity += asset.quantity;
  }

  let totalValue = 0;

  // 2️⃣ Calculate values
  const breakdown = Object.values(grouped).map((holding) => {
    const priceData = prices[holding.coin_id];
    if (!priceData) return null;

    const price = priceData.usd;
    const value = price * holding.quantity;

    totalValue += value;

    return {
      coin_id: holding.coin_id,
      quantity: Number(holding.quantity.toFixed(8)),
      price,
      value: Number(value.toFixed(2)),
      change24h: priceData.usd_24h_change,
    };
  }).filter(Boolean);

  return {
    totalValue: Number(totalValue.toFixed(2)),
    breakdown,
  };
}
