const API_BASE = "/api";

export async function fetchCoinMarketChart(coinId, days = 7) {
  const res = await fetch(
    `${API_BASE}/market/chart?coin=${coinId}&days=${days}`
  );

  if (!res.ok) throw new Error("Failed to fetch market data");

  const data = await res.json();

  if (!Array.isArray(data.prices)) {
    console.warn("Bad chart response:", data);
    return [];
  }

  return data.prices.map(([timestamp, price]) => ({
    timestamp,
    time: new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    fullDate: new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    price: Number(price.toFixed(2)),
  }));
}
