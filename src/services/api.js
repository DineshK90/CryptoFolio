import { auth } from "../firebase";

const API_BASE = "/api";

/* =====================
   INTERNAL HELPERS
===================== */
async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function handleResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data?.error || "API request failed");
  }

  return data;
}

/* =====================
   USERS
===================== */
export async function createUserIfNotExists() {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      uid: auth.currentUser.uid,
      name: auth.currentUser.displayName,
    }),
  });

  return handleResponse(res);
}

/* =====================
   ASSETS
===================== */
export async function fetchAssets() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/assets`, { headers });
  return handleResponse(res);
}

export async function addAsset(coinId, quantity) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/assets`, {
    method: "POST",
    headers,
    body: JSON.stringify({ coinId, quantity }),
  });
  return handleResponse(res);
}

export async function updateAsset(assetId, quantity) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_BASE}/assets`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ id: assetId, quantity }),
  });

  const data = await handleResponse(res);

  // 🔥 Auto delete signal
  if (data?.deleted) return { deleted: true };

  return data;
}

export async function deleteAsset(assetId) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/assets?id=${assetId}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(res);
}
