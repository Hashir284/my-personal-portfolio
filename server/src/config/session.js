import { env } from './env.js'

export const ADMIN_COOKIE = 'admin_token'
export const SESSION_MS = 12 * 60 * 60 * 1000

/**
 * Cross-site cookies (Vercel frontend -> API host) need SameSite=None + Secure.
 * Locally the browser accepts SameSite=Lax over plain HTTP.
 */
export const cookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: env.isProduction ? 'none' : 'lax',
  path: '/',
}
