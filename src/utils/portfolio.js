export function calculatePortfolio(rawAssets, prices) {
  const grouped = {};

  // 1. Group & sum quantities
  for (const asset of rawAssets) {
    const qty = Number(asset.quantity || 0);
    if (qty <= 0) continue;

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
    const priceData = prices?.[holding.coin_id];

    // 2. Price missing → mark unavailable, but don't poison totals
    if (!priceData || priceData.usd == null) {
      return {
        coin_id: holding.coin_id,
        quantity: Number(holding.quantity.toFixed(8)),
        price: null,
        value: null,
        change24h: null,
        history: [],
        unavailable: true,
      };
    }

    const price = Number(priceData.usd);
    const change = Number(priceData.usd_24h_change || 0);
    const value = holding.quantity * price;

    // 3. Only add valid values
    if (!Number.isNaN(value)) {
      totalValue += value;
    }

    return {
      coin_id: holding.coin_id,
      quantity: Number(holding.quantity.toFixed(8)),
      price,
      value: Number(value.toFixed(2)),
      change24h: change,
      history: [],
      unavailable: false,
    };
  });

  return {
    totalValue: Number(totalValue.toFixed(2)),
    breakdown,
  };
}
