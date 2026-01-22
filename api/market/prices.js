// api/market/prices.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({ error: "Missing ids param" });
    }

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids,
          vs_currencies: "usd",
          include_24hr_change: true,
        },
        timeout: 10000,
      }
    );

    const payload = response.data || {};

    // 🔐 Normalize output
    const safe = {};
    for (const id of ids.split(",")) {
      const coin = payload[id];
      if (coin && typeof coin === "object") {
        safe[id] = {
          usd: Number(coin.usd || 0),
          usd_24h_change: Number(coin.usd_24h_change || 0),
        };
      }
    }

    return res.status(200).json(safe);
  } catch (err) {
    // Never break the frontend; return empty data with context
    console.error("CoinGecko price error:", err.message, err.response?.status);
    return res.status(200).json({});
  }
}
