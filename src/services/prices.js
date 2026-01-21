const API_BASE = "/api";

// Keep batch size generous to reduce request count but under CG limits
const BATCH_SIZE = 45;

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
    return res.ok ? res : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCoinPrices(coinIds = []) {
  if (!coinIds.length) return {};

  const uniqueIds = [...new Set(coinIds)];
  const groups = chunk(uniqueIds, BATCH_SIZE);
  const merged = {};

  for (const group of groups) {
    let attempts = 0;
    let success = false;

    while (attempts < 2 && !success) {
      const res = await fetchWithTimeout(
        `${API_BASE}/market/prices?ids=${group.join(",")}`
      );

      if (res) {
        const data = await res.json();
        for (const id of group) {
          if (data[id]) merged[id] = data[id];
        }
        success = true;
      } else {
        attempts += 1;
        if (attempts < 2) await sleep(300 * attempts);
      }
    }
  }

  // If some ids still missing, try one more combined call
  const missing = uniqueIds.filter((id) => !merged[id]);
  if (missing.length) {
    const res = await fetchWithTimeout(
      `${API_BASE}/market/prices?ids=${missing.join(",")}`
    );
    if (res) {
      const data = await res.json();
      for (const id of missing) {
        if (data[id]) merged[id] = data[id];
      }
    }
  }

  return merged;
}
