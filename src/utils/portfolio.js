export function calculatePortfolio(rawAssets, prices) {
  const grouped = {};

  for (const asset of rawAssets) {
    const qty = Number(asset.quantity);

    if (!grouped[asset.coin_id]) {
      grouped[asset.coin_id] = {
        coin_id: asset.coin_id,
        quantity: 0,
      };
    }

    grouped[asset.coin_id].quantity += qty;
  }

  let totalValue = 0;

  const breakdown = Object.values(grouped).map((holding) => {
    const priceData = prices[holding.coin_id];

    if (!priceData) return null;

    const price = priceData.usd;
    const value = holding.quantity * price;

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
