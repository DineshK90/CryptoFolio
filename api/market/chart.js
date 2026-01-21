// Vercel Serverless Function
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { coin, days = 7 } = req.query;

    if (!coin) {
      return res.status(400).json({ error: "Missing coin query param" });
    }

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: days,
        },
        timeout: 10000,
      }
    );

    // Return prices array: [[timestamp, price], ...]
    res.status(200).json(response.data.prices);
  } catch (err) {
    console.error("CoinGecko Chart API error:", err.message);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
}
