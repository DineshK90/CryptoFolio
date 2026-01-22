// /api/market/chart.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const coin = req.query.coin;
    const days = req.query.days;

    if (!coin || !days) {
      return res.status(400).json({
        error: "Missing query params",
        received: { coin, days },
      });
    }

    const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`;

    const response = await axios.get(url, {
      params: {
        vs_currency: "usd",
        days,
      },
      headers: {
        "User-Agent": "cryptofolio-app",
        Accept: "application/json",
      },
      timeout: 15000,
    });

    if (!response.data?.prices) {
      return res.status(502).json({
        error: "Invalid CoinGecko response",
        raw: response.data,
      });
    }

    return res.status(200).json(response.data);
  } catch (err) {
    console.error("MARKET CHART ERROR:", err.message);
    console.error(err.response?.data || err);

    return res.status(500).json({
      error: "Chart proxy failed",
      message: err.message,
      upstream: err.response?.data || null,
    });
  }
}
