import { env } from '../config/env.js'

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']

/**
 * CSRF defence for cookie auth: state-changing requests must come from an
 * allowed origin. Browsers always send Origin on cross-site writes.
 */
export function requireTrustedOrigin(req, res, next) {
  if (SAFE_METHODS.includes(req.method)) return next()
  return env.clientOrigins.includes(req.headers.origin)
    ? next()
    : res.status(403).json({ error: 'Origin not allowed.' })
}
