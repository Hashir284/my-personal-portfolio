import { httpError } from './httpError.js'

const DATA_URL = /^data:([\w/+.-]+);base64,([A-Za-z0-9+/=]+)$/

/** Split a base64 data URL into its mime type, buffer and byte size. */
export function parseDataUrl(dataUrl) {
  const match = DATA_URL.exec(String(dataUrl || ''))
  if (!match) throw httpError(400, 'Invalid file data.')

  const [, mime, base64] = match
  return { mime, base64, bytes: Math.floor((base64.length * 3) / 4) }
}
