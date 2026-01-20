import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 50,
        page: 1,
        sparkline: false,
      },
      timeout: 10000,
    });

    res.json(response.data);
  } catch (err) {
    console.error("CoinGecko API error:", err.message);
    res.status(500).json({ error: "Failed to fetch prices" });
  }
}
