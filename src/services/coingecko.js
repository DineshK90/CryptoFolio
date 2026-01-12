import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
});

// Fetch top coins by market cap
export async function fetchCoins() {
  const response = await api.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: false,
    },
  });

  return response.data;
}
