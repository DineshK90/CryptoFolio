const API_BASE = "/api";

export async function fetchCoinPrices() {
  const res = await fetch(`${API_BASE}/market/prices`);

  if (!res.ok) {
    throw new Error("Failed to fetch prices");
  }

  return await res.json();
}
