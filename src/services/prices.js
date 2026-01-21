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
  } catch (err) {
    console.warn("Price fetch failed:", url, err.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* =====================
   FETCH PRICES (HARDENED)
===================== */
export async function fetchCoinPrices(coinIds = []) {
  if (!coinIds.length) return {};

  const groups = chunk(coinIds, 3);
  const merged = {};
  const failed = [];

  for (const group of groups) {
    let success = false;

    for (let attempt = 1; attempt <= 3 && !success; attempt++) {
      const res = await fetchWithTimeout(
        `${API_BASE}/market/prices?ids=${group.join(",")}`
      );

      if (res && res.ok) {
        const data = await res.json();

        // Validate shape
        for (const id of group) {
          if (!data[id] || data[id].usd == null) {
            failed.push(id);
          } else {
            merged[id] = {
              usd: Number(data[id].usd),
              usd_24h_change: Number(data[id].usd_24h_change || 0),
            };
          }
        }

        success = true;
      } else {
        console.warn(
          `Price batch failed (attempt ${attempt})`,
          group
        );
        await sleep(300 * attempt);
      }
    }
  }

  if (failed.length) {
    console.warn("Missing prices for:", failed);
  }

  return merged;
}
