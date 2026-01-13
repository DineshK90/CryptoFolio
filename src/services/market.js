export async function fetchBitcoinMarketChart(days = 7) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch market data");
  }

  const data = await res.json();

  const prices = data.prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    price: Number(price.toFixed(2)),
  }));

  const first = prices[0].price;
  const last = prices[prices.length - 1].price;

  const changePercent = (((last - first) / first) * 100).toFixed(2);

  return {
    prices,
    currentPrice: last,
    changePercent,
  };
}
