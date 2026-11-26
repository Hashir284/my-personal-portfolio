/** Trimmed, length-limited string — the only shape we accept from clients. */
export const asString = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

export const asArray = (value, max) => (Array.isArray(value) ? value.slice(0, max) : [])

export const asStringList = (value, { max = 30, maxLength = 200 } = {}) =>
  asArray(value, max)
    .map((item) => asString(item, maxLength))
    .filter(Boolean)

export const asHttpUrl = (value) => {
  const url = asString(value, 500)
  return /^https?:\/\//i.test(url) ? url : ''
}

/** Cloudinary URLs or site-relative paths such as /hashir.webp. */
export const asAssetUrl = (value) => {
  const url = asString(value, 500)
  return /^(https?:\/\/|\/(?!\/))/i.test(url) ? url : ''
}

export const isVisible = (value) => value !== false

export const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
