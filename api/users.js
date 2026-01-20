// Vercel Serverless Function
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
    });
  }
  return pool;
}

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = await admin.auth().verifyIdToken(token);
    const { name } = req.body;

    const db = getPool();

    const existing = await db.query(
      "SELECT * FROM users WHERE firebase_uid=$1",
      [decoded.uid]
    );

    if (existing.rows.length) {
      return res.json(existing.rows[0]);
    }

    const result = await db.query(
      `INSERT INTO users (firebase_uid, display_name)
       VALUES ($1,$2) RETURNING *`,
      [decoded.uid, name || "Anonymous"]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API request failed" });
  }
}
