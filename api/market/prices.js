// Vercel Serverless Function
import axios from "axios";

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const ids = req.query.ids;

    if (!ids || typeof ids !== "string") {
      return res.status(400).json({ error: "Missing or invalid ids" });
    }

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids,                 // e.g. "bitcoin,ethereum"
          vs_currencies: "usd",
          include_24hr_change: true,
        },
        timeout: 8000,
        headers: {
          "User-Agent": "CryptoFolio/1.0",
          Accept: "application/json",
        },
      }
    );

    // Defensive: ensure object shape
    if (!response.data || typeof response.data !== "object") {
      return res.status(500).json({ error: "Invalid CoinGecko response" });
    }

    return res.status(200).json(response.data);
  } catch (err) {
    console.error("CoinGecko API error:", err.message);
    return res.status(500).json({ error: "Failed to fetch prices" });
  }
}
