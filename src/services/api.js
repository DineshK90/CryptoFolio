import { auth } from "../firebase";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* =====================
   INTERNAL HELPERS
===================== */

/**
 * Safely get auth headers.
 * Throws if user is not authenticated.
 */
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

/**
 * Handle API responses consistently.
 */
async function handleResponse(res) {
  let data = null;

  try {
    data = await res.json();
  } catch {
    // Non-JSON response (allowed for DELETE, etc.)
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

/**
 * Create user record in backend if it does not exist.
 * Safe to call multiple times.
 */
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
   ASSETS (CRUD)
===================== */

/**
 * Fetch all assets for current user.
 */
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

/**
 * Add a new asset entry.
 */
export async function addAsset(coinId, quantity) {
  try {
    if (!coinId || quantity == null) {
      throw new Error("Invalid asset data");
    }

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

/**
 * Update asset quantity.
 */
export async function updateAsset(assetId, quantity) {
  try {
    if (!assetId || quantity == null) {
      throw new Error("Invalid update parameters");
    }

    const headers = await getAuthHeaders();

    const res = await fetch(`${API_BASE}/assets/${assetId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ quantity }),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("updateAsset failed:", err);
    throw err;
  }
}

/**
 * Delete an asset.
 */
export async function deleteAsset(assetId) {
  try {
    if (!assetId) {
      throw new Error("Asset ID required");
    }

    const headers = await getAuthHeaders();

    const res = await fetch(`${API_BASE}/assets/${assetId}`, {
      method: "DELETE",
      headers,
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("deleteAsset failed:", err);
    throw err;
  }
}
