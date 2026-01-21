const API_BASE = "/api";

/* =====================
   Fetch Coin Chart (safe)
===================== */

async function fetchWithTimeout(url, timeout = 8000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
}

export async function fetchCoinMarketChart(coinId, days = 7) {
  const res = await fetchWithTimeout(
    `${API_BASE}/market/chart?coin=${coinId}&days=${days}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch market data");
  }

  const data = await res.json();

  return data.map(([timestamp, price]) => ({
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
