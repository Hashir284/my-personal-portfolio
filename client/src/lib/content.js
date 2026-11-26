// Remote (admin-saved) content overrides the defaults per section. Empty strings never wipe a default.
export function mergeContent(base, remote = {}) {
  const out = { ...base }
  for (const [k, v] of Object.entries(remote || {})) {
    if (Array.isArray(v)) out[k] = v
    else if (v && typeof v === 'object') out[k] = deep(base[k] || {}, v)
    else if (typeof v === 'string' && v) out[k] = v
  }
  return out
}
function deep(base, v) {
  const o = { ...base }
  for (const [k, x] of Object.entries(v)) {
    if (x && typeof x === 'object' && !Array.isArray(x)) o[k] = deep(base[k] || {}, x)
    else if (x !== '' && x != null) o[k] = x
  }
  return o
}
