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

    if (!Array.isArray(data.prices)) {
      console.warn("Bad chart response - prices not an array:", data);
      return [];
    }

    if (data.prices.length === 0) {
      console.warn("Empty prices array from API");
      return [];
    }

    return data.prices
      .map(([timestamp, price]) => {
        if (!Array.isArray([timestamp, price]) || typeof price !== "number") {
          console.warn("Invalid price entry:", [timestamp, price]);
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
      .filter((item) => item !== null);
  } catch (err) {
    console.error("Chart fetch error:", err.message);
    throw err;
  }
}
