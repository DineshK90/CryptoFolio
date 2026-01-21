import { auth } from "../firebase";

const API_BASE = "/api";

/* =====================
   INTERNAL HELPERS
===================== */

async function getAuthHeaders() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

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
  } catch {
    // non-json response
  }

  if (!res.ok) {
    const message =
      data?.error || data?.message || "API request failed";
    throw new Error(message);
  }

  return data;
}

/* =====================
   USERS
===================== */

export async function createUserIfNotExists() {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      }),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("createUserIfNotExists failed:", err);
    throw err;
  }
}

/* =====================
   ASSETS
===================== */

export async function fetchAssets() {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_BASE}/assets`, {
      headers,
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("fetchAssets failed:", err);
    throw err;
  }
}

export async function addAsset(coinId, quantity) {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_BASE}/assets`, {
      method: "POST",
      headers,
      body: JSON.stringify({ coinId, quantity }),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("addAsset failed:", err);
    throw err;
  }
}

export async function updateAsset(assetId, quantity) {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_BASE}/assets`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ id: assetId, quantity }),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("updateAsset failed:", err);
    throw err;
  }
}

export async function deleteAsset(assetId) {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_BASE}/assets?id=${assetId}`, {
      method: "DELETE",
      headers,
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("deleteAsset failed:", err);
    throw err;
  }
}
