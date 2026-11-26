import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { ADMIN_COOKIE } from '../config/session.js'
import { httpError } from '../utils/httpError.js'

/** Blocks every admin route unless a valid session cookie is present. */
export function requireAdmin(req, res, next) {
  try {
    const payload = jwt.verify(req.cookies?.[ADMIN_COOKIE] || '', env.jwtSecret)
    if (payload.role !== 'admin') throw httpError(401, 'Please log in.')
    return next()
  } catch {
    return next(httpError(401, 'Please log in.'))
  }
}
