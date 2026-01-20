import admin from "firebase-admin";
import pkg from "pg";

const { Pool } = pkg;
let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 1,
    });
  }
  return pool;
}

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = await admin.auth().verifyIdToken(token);
    const db = getPool();

    const user = await db.query(
      "SELECT id FROM users WHERE firebase_uid=$1",
      [decoded.uid]
    );

    if (!user.rows.length) {
      return res.status(400).json({ error: "User not found" });
    }

    if (req.method === "GET") {
      const assets = await db.query(
        "SELECT * FROM assets WHERE user_id=$1",
        [user.rows[0].id]
      );
      return res.json(assets.rows);
    }

    if (req.method === "POST") {
      const { coinId, quantity } = req.body;
      const result = await db.query(
        `INSERT INTO assets (user_id, coin_id, quantity)
         VALUES ($1,$2,$3) RETURNING *`,
        [user.rows[0].id, coinId, quantity]
      );
      return res.json(result.rows[0]);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API request failed" });
  }
}
 