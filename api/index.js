import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import pkg from "pg";

const { Pool } = pkg;

const app = express();

/* =====================
   MIDDLEWARE
===================== */
app.use(cors());
app.use(express.json());

/* =====================
   FIREBASE ADMIN (SAFE INIT)
===================== */
if (!admin.apps.length) {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT env variable is missing");
  }

  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    ),
  });
}

/* =====================
   DATABASE (NEON)
===================== */
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL env variable is missing");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/* =====================
   AUTH MIDDLEWARE
===================== */
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split("Bearer ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

/* =====================
   HEALTH CHECK (OPTIONAL BUT GOOD)
===================== */
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

/* =====================
   USERS
===================== */
app.post("/users", verifyToken, async (req, res) => {
  const { uid, name } = req.body;

  if (!uid || !name) {
    return res.status(400).json({ error: "Missing uid or name" });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO users (firebase_uid, display_name)
      VALUES ($1, $2)
      ON CONFLICT (firebase_uid)
      DO UPDATE SET display_name = EXCLUDED.display_name
      RETURNING *
      `,
      [uid, name]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

/* =====================
   ASSETS (CRUD)
===================== */

/* READ */
app.get("/assets", verifyToken, async (req, res) => {
  try {
    const userResult = await pool.query(
      "SELECT id FROM users WHERE firebase_uid=$1",
      [req.user.uid]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const assets = await pool.query(
      "SELECT * FROM assets WHERE user_id=$1 ORDER BY created_at DESC",
      [userResult.rows[0].id]
    );

    res.json(assets.rows);
  } catch (err) {
    console.error("Fetch assets error:", err);
    res.status(500).json({ error: "Failed to fetch assets" });
  }
});

/* CREATE */
app.post("/assets", verifyToken, async (req, res) => {
  const { coinId, quantity } = req.body;

  if (!coinId || typeof quantity !== "number") {
    return res.status(400).json({ error: "Invalid asset payload" });
  }

  try {
    const userResult = await pool.query(
      "SELECT id FROM users WHERE firebase_uid=$1",
      [req.user.uid]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await pool.query(
      `
      INSERT INTO assets (user_id, coin_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [userResult.rows[0].id, coinId, quantity]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Add asset error:", err);
    res.status(500).json({ error: "Failed to add asset" });
  }
});

/* UPDATE */
app.put("/assets/:id", verifyToken, async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;

  if (typeof quantity !== "number") {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  try {
    const result = await pool.query(
      `
      UPDATE assets
      SET quantity = $1
      WHERE id = $2
      RETURNING *
      `,
      [quantity, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Update asset error:", err);
    res.status(500).json({ error: "Failed to update asset" });
  }
});

/* DELETE */
app.delete("/assets/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM assets WHERE id=$1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete asset error:", err);
    res.status(500).json({ error: "Failed to delete asset" });
  }
});

/* =====================
   EXPORT FOR VERCEL
===================== */
export default app;
