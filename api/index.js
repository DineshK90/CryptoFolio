import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  ),
});

// Neon DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Auth middleware
async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Routes
app.post("/users", verifyToken, async (req, res) => {
  const { uid, name } = req.body;

  const result = await pool.query(
    `INSERT INTO users (firebase_uid, display_name)
     VALUES ($1, $2)
     ON CONFLICT (firebase_uid) DO NOTHING
     RETURNING *`,
    [uid, name]
  );

  res.json(result.rows[0]);
});

app.get("/assets", verifyToken, async (req, res) => {
  const user = await pool.query(
    "SELECT id FROM users WHERE firebase_uid=$1",
    [req.user.uid]
  );

  const assets = await pool.query(
    "SELECT * FROM assets WHERE user_id=$1",
    [user.rows[0].id]
  );

  res.json(assets.rows);
});

app.post("/assets", verifyToken, async (req, res) => {
  const { coinId, quantity } = req.body;

  const user = await pool.query(
    "SELECT id FROM users WHERE firebase_uid=$1",
    [req.user.uid]
  );

  const result = await pool.query(
    `INSERT INTO assets (user_id, coin_id, quantity)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [user.rows[0].id, coinId, quantity]
  );

  res.json(result.rows[0]);
});

app.put("/assets/:id", verifyToken, async (req, res) => {
  const { quantity } = req.body;

  const result = await pool.query(
    `UPDATE assets SET quantity=$1 WHERE id=$2 RETURNING *`,
    [quantity, req.params.id]
  );

  res.json(result.rows[0]);
});

app.delete("/assets/:id", verifyToken, async (req, res) => {
  await pool.query("DELETE FROM assets WHERE id=$1", [req.params.id]);
  res.json({ success: true });
});

// Export for Vercel
export default app;
