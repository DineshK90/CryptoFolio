// Vercel Serverless Function
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({ error: "Missing ids query param" });
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

    res.status(200).json(response.data);
  } catch (err) {
    console.error("CoinGecko API error:", err.message);
    res.status(500).json({ error: "Failed to fetch prices" });
  }
}
