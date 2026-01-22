import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ prices: [], error: "Method not allowed" });
    }

    const { coin, days } = req.query;

    if (!coin || !days) {
      return res.status(400).json({
        prices: [],
        error: "Missing coin or days parameter",
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

    const prices = response.data?.prices;
    if (!Array.isArray(prices)) {
      console.error("Invalid response from CoinGecko:", response.data);
      return res.status(200).json({
        prices: [],
        error: "Invalid data from market API",
      });
    }

    return res.status(200).json({
      prices: prices,
    });
  } catch (err) {
    console.error("MARKET CHART ERROR:", err.message, err.code);

    return res.status(200).json({
      prices: [],
      error: err.message,
    });
  }
}
