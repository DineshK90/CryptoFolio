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

    const { id: assetId } = req.query;

    if (req.method === "PUT") {
      const { quantity } = req.body;
      const result = await db.query(
        `UPDATE assets SET quantity=$1 WHERE id=$2 AND user_id=$3 RETURNING *`,
        [quantity, assetId, user.rows[0].id]
      );
      
      if (!result.rows.length) {
        return res.status(404).json({ error: "Asset not found" });
      }
      
      return res.json(result.rows[0]);
    }

    if (req.method === "DELETE") {
      const result = await db.query(
        `DELETE FROM assets WHERE id=$1 AND user_id=$2 RETURNING *`,
        [assetId, user.rows[0].id]
      );
      
      if (!result.rows.length) {
        return res.status(404).json({ error: "Asset not found" });
      }
      
      return res.json({ success: true });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API request failed" });
  }
}
