const API_BASE = "/api";

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

export async function fetchCoinPrices(coinIds = []) {
  if (!coinIds.length) return {};

  const groups = chunk(coinIds, 3);
  const merged = {};

  for (const group of groups) {
    const res = await fetchWithTimeout(
      `${API_BASE}/market/prices?ids=${group.join(",")}`
    );

    if (!res) continue;

    const data = await res.json();

    // Only merge real coins
    for (const id of group) {
      if (data[id]) {
        merged[id] = data[id];
      }
    }
  }

  return merged;
}
