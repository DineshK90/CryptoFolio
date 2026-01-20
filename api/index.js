import express from "express";
import cors from "cors";
import pkg from "pg";
import admin from "firebase-admin";

const { Pool } = pkg;
const app = express();

/* =====================================================
   MIDDLEWARE
===================================================== */
app.use(cors());
app.use(express.json());

/* =====================================================
   FIREBASE ADMIN (SERVERLESS SAFE)
===================================================== */
if (!admin.apps.length) {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT env var missing");
  }

  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  // REQUIRED for Vercel env vars
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/* =====================================================
   DATABASE (NEON / POSTGRES — SERVERLESS SAFE)
===================================================== */
let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 1, // 🔑 CRITICAL for serverless
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

/* =====================================================
   AUTH MIDDLEWARE
===================================================== */
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

/* =====================================================
   HEALTH CHECKS
===================================================== */
app.get("/", (_req, res) => {
  res.json({ status: "api alive" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/health/db", async (_req, res) => {
  try {
    const result = await getPool().query("SELECT NOW()");
    res.json({ status: "ok", time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

/* =====================================================
   USERS
===================================================== */
/**
 * Create user if not exists (idempotent)
 */
app.post("/users", verifyToken, async (req, res) => {
  try {
    const { uid, name } = req.body;
    if (!uid) {
      return res.status(400).json({ error: "Missing uid" });
    }

    const pool = getPool();

    // FAST EXIT — avoids unnecessary inserts
    const existing = await pool.query(
      "SELECT id, display_name FROM users WHERE firebase_uid = $1",
      [uid]
    );

    if (existing.rows.length) {
      return res.json(existing.rows[0]);
    }

    const result = await pool.query(
      `
      INSERT INTO users (firebase_uid, display_name)
      VALUES ($1, $2)
      RETURNING *
      `,
      [uid, name || "Anonymous"]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

/* =====================================================
   ASSETS (CRUD)
===================================================== */
/**
 * CREATE asset
 */
app.post("/assets", verifyToken, async (req, res) => {
  try {
    const { coinId, quantity } = req.body;

    if (!coinId || quantity === undefined) {
      return res.status(400).json({ error: "Missing coinId or quantity" });
    }

    const pool = getPool();

    const user = await pool.query(
      "SELECT id FROM users WHERE firebase_uid = $1",
      [req.user.uid]
    );

    if (!user.rows.length) {
      return res.status(400).json({ error: "User not found" });
    }

    const result = await pool.query(
      `
      INSERT INTO assets (user_id, coin_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [user.rows[0].id, coinId, quantity]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Add asset error:", err);
    res.status(500).json({ error: "Failed to add asset" });
  }
});

/**
 * READ assets
 */
app.get("/assets", verifyToken, async (req, res) => {
  try {
    const pool = getPool();

    const user = await pool.query(
      "SELECT id FROM users WHERE firebase_uid = $1",
      [req.user.uid]
    );

    if (!user.rows.length) {
      return res.status(400).json({ error: "User not found" });
    }

    const assets = await pool.query(
      `
      SELECT id, coin_id, quantity, created_at
      FROM assets
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [user.rows[0].id]
    );

    res.json(assets.rows);
  } catch (err) {
    console.error("Fetch assets error:", err);
    res.status(500).json({ error: "Failed to fetch assets" });
  }
});

/**
 * UPDATE asset
 */
app.put("/assets/:id", verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity === undefined) {
      return res.status(400).json({ error: "Missing quantity" });
    }

    const result = await getPool().query(
      `
      UPDATE assets
      SET quantity = $1
      WHERE id = $2
      RETURNING *
      `,
      [quantity, req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Update asset error:", err);
    res.status(500).json({ error: "Failed to update asset" });
  }
});

/**
 * DELETE asset
 */
app.delete("/assets/:id", verifyToken, async (req, res) => {
  try {
    await getPool().query(
      "DELETE FROM assets WHERE id = $1",
      [req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Delete asset error:", err);
    res.status(500).json({ error: "Failed to delete asset" });
  }
});

/* =====================================================
   MARKET DATA (SERVER-SIDE, AVOIDS CORS)
===================================================== */
app.get("/market/prices", async (_req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
    );

    if (!response.ok) {
      throw new Error("CoinGecko error");
    }

    res.json(await response.json());
  } catch (err) {
    console.error("Market price error:", err);
    res.status(500).json({ error: "Failed to fetch prices" });
  }
});

/* =====================================================
   EXPORT FOR VERCEL
===================================================== */
export default app;
