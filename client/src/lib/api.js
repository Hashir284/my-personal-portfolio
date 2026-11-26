export const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

// Cookies (HTTP-only) carry the admin session, so the token never touches JavaScript.
export async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method, credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) { const err = new Error(data.error || 'Request failed.'); err.status = res.status; throw err }
  return data
}
