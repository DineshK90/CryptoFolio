/* eslint-env node */
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
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

/* =====================
   FIREBASE ADMIN
===================== */
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  serviceAccount.private_key =
    serviceAccount.private_key.replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(req, res) {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing token" });
    }

    const token = auth.replace("Bearer ", "");
    const decoded = await admin.auth().verifyIdToken(token);
    const db = getPool();

    const user = await db.query(
      "SELECT id FROM users WHERE firebase_uid=$1",
      [decoded.uid]
    );

    if (!user.rows.length) {
      return res.status(400).json({ error: "User not found" });
    }

    const userId = user.rows[0].id;

    /* ===== READ ===== */
    if (req.method === "GET") {
      const assets = await db.query(
        "SELECT * FROM assets WHERE user_id=$1 ORDER BY created_at DESC",
        [userId]
      );
      return res.json(assets.rows);
    }

    /* ===== CREATE ===== */
    if (req.method === "POST") {
      const { coinId, quantity } = req.body;

      if (!coinId || quantity === undefined) {
        return res.status(400).json({ error: "Missing coinId or quantity" });
      }

      const result = await db.query(
        `
        INSERT INTO assets (user_id, coin_id, quantity)
        VALUES ($1,$2,$3)
        RETURNING *
        `,
        [userId, coinId, quantity]
      );

      return res.json(result.rows[0]);
    }

    /* ===== UPDATE ===== */
    if (req.method === "PUT") {
      const { id, quantity } = req.body;

      if (!id || quantity === undefined) {
        return res.status(400).json({ error: "Missing id or quantity" });
      }

      const result = await db.query(
        `
        UPDATE assets
        SET quantity=$1
        WHERE id=$2 AND user_id=$3
        RETURNING *
        `,
        [quantity, id, userId]
      );

      if (!result.rows.length) {
        return res.status(404).json({ error: "Asset not found" });
      }

      return res.json(result.rows[0]);
    }

    /* ===== DELETE ===== */
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) return res.status(400).json({ error: "Missing id" });

      await db.query(
        "DELETE FROM assets WHERE id=$1 AND user_id=$2",
        [id, userId]
      );

      return res.json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    console.error("ASSETS API ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
