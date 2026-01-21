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
    return await fetch(url, { signal: controller.signal });
  } catch (err) {
    console.warn("Price fetch failed:", url, err.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* =====================
   FETCH PRICES (SAFE)
===================== */
export async function fetchCoinPrices(coinIds = []) {
  if (!coinIds.length) return {};

  const groups = chunk(coinIds, 3); // CoinGecko-safe batching
  const merged = {};

  for (const group of groups) {
    let attempts = 0;
    let success = false;

    while (attempts < 2 && !success) {
      const res = await fetchWithTimeout(
        `${API_BASE}/market/prices?ids=${group.join(",")}`
      );

      if (res && res.ok) {
        const data = await res.json();
        Object.assign(merged, data);
        success = true;
      } else {
        attempts += 1;
        console.warn(
          `Price batch failed (attempt ${attempts})`,
          group
        );
        if (attempts < 2) {
          await sleep(400 * attempts);
        }
      }
    }
  }

  return merged;
}
