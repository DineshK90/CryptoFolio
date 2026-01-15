export async function fetchCoinMarketChart(coinId, days = 7) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch market data");
  }

  const data = await res.json();

  return data.prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    price: Number(price.toFixed(2)),
  }));
}
