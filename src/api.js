// src/api.js
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";
console.log("DEBUG: API_BASE =", API_BASE);
/**
 * GET /api/chats?userId=...
 */
export async function fetchChats(userId) {
  const url = `${API_BASE}/api/chats${userId ? "?userId=" + encodeURIComponent(userId) : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch chats");
  return res.json();
}

/**
 * POST /api/chats
 * payload: { userId, role, message, meta? }
 */
export async function postChat({ userId, role = "user", message, meta = {} }) {
  const res = await fetch(`${API_BASE}/api/chats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, role, message, meta }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Failed to post chat: ${res.status} ${txt}`);
  }
  return res.json();
}
