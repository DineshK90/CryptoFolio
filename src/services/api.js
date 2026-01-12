import { auth } from "../firebase";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* =====================
   AUTH HEADERS
===================== */

async function getAuthHeaders() {
  const token = await auth.currentUser.getIdToken();

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

/* =====================
   USERS
===================== */

export async function createUserIfNotExists() {
  const headers = await getAuthHeaders();

  await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      uid: auth.currentUser.uid,
      name: auth.currentUser.displayName,
    }),
  });
}

/* =====================
   ASSETS (CRUD)
===================== */

export async function fetchAssets() {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_BASE}/assets`, {
    headers,
  });

  return res.json();
}

export async function addAsset(coinId, quantity) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_BASE}/assets`, {
    method: "POST",
    headers,
    body: JSON.stringify({ coinId, quantity }),
  });

  return res.json();
}

export async function updateAsset(assetId, quantity) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_BASE}/assets/${assetId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ quantity }),
  });

  return res.json();
}

export async function deleteAsset(assetId) {
  const headers = await getAuthHeaders();

  await fetch(`${API_BASE}/assets/${assetId}`, {
    method: "DELETE",
    headers,
  });
}
