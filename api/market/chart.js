import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { coin, days } = req.query;

    if (!coin || !days) {
      return res.status(400).json({
        prices: [],
        error: "Missing params",
      });
    }

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days,
        },
        timeout: 15000,
      }
    );

    return res.status(200).json({
      prices: response.data.prices || [],
    });
  } catch (err) {
    console.error("MARKET CHART ERROR:", err.message);

    return res.status(200).json({
      prices: [], // 🔥 NEVER break frontend
      error: err.message,
    });
  }
}
