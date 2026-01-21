export function calculatePortfolio(rawAssets, prices) {
  const grouped = {};

  for (const asset of rawAssets) {
    const qty = Number(asset.quantity || 0);

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

    // If CoinGecko fails for one coin — DON'T break the app
    if (!priceData) {
      return {
        coin_id: holding.coin_id,
        quantity: Number(holding.quantity.toFixed(8)),
        price: 0,
        value: 0,
        change24h: 0,
        history: [],
        unavailable: true,
      };
    }

    const price = Number(priceData.usd || 0);
    const change = Number(priceData.usd_24h_change || 0);
    const value = holding.quantity * price;

    totalValue += value;

    return {
      coin_id: holding.coin_id,
      quantity: Number(holding.quantity.toFixed(8)),
      price,
      value: Number(value.toFixed(2)),
      change24h: change,
      history: [], // will be filled later by chart loader
      unavailable: false,
    };
  });

  return {
    totalValue: Number(totalValue.toFixed(2)),
    breakdown,
  };
}
