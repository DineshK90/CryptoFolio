const API_BASE = "/api";

export async function fetchCoinMarketChart(coinId, days = 7) {
  try {
    const res = await fetch(
      `${API_BASE}/market/chart?coin=${coinId}&days=${days}`
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data || typeof data !== "object") {
      console.warn("Invalid response format:", data);
      return [];
    }

    const prices = Array.isArray(data.prices) ? data.prices : [];
    if (!prices.length) {
      return [];
    }

    return prices
      .map((entry) => {
        if (!Array.isArray(entry) || entry.length < 2) return null;
        const [timestamp, price] = entry;
        if (typeof timestamp !== "number" || typeof price !== "number") {
          return null;
        }

        return {
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
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.error("Chart fetch error:", err.message);
    throw err;
  }
}
