const API_BASE = "/api";

export async function fetchCoinPrices(coinIds = []) {
  const res = await fetch(`${API_BASE}/market/prices`);

  if (!res.ok) {
    throw new Error("Failed to fetch prices");
  }

  const allCoins = await res.json();
  
  // If no specific coins requested, return all
  if (!coinIds.length) return allCoins;
  
  // Convert array to object keyed by coin ID
  const priceMap = {};
  allCoins.forEach(coin => {
    if (coinIds.includes(coin.id)) {
      priceMap[coin.id] = {
        usd: coin.current_price,
        usd_24h_change: coin.price_change_percentage_24h || 0,
      };
    }
  });
  
  return priceMap;
}
