const API_BASE = "/api";

/* =====================
   HELPERS
===================== */
function chunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

async function fetchWithTimeout(url, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/* =====================
   FETCH PRICES
===================== */
export async function fetchCoinPrices(coinIds = []) {
  if (!coinIds.length) return {};

  const groups = chunk(coinIds, 3); // CoinGecko safe batch size

  const results = await Promise.all(
    groups.map(async group => {
      const res = await fetchWithTimeout(
        `${API_BASE}/market/prices?ids=${group.join(",")}`
      );

      if (!res.ok) throw new Error("Failed to fetch prices");

      return res.json();
    })
  );

  // merge all batch responses
  return Object.assign({}, ...results);
}
