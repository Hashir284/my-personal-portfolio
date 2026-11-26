import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { env } from '../config/env.js'
import { ADMIN_COOKIE, SESSION_MS, cookieOptions } from '../config/session.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { httpError } from '../utils/httpError.js'

/* Compared against when the email is wrong so both paths take similar time. */
const DUMMY_HASH = bcrypt.hashSync('not-the-password', 10)

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {}
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw httpError(400, 'Email and password are required.')
  }

  const emailMatches = email.trim().toLowerCase() === env.adminEmail.toLowerCase()
  const passwordMatches = await bcrypt.compare(
    password,
    emailMatches ? env.adminPasswordHash : DUMMY_HASH,
  )

  if (!emailMatches || !passwordMatches) throw httpError(401, 'Wrong email or password.')

  const token = jwt.sign({ role: 'admin' }, env.jwtSecret, { expiresIn: '12h' })
  res.cookie(ADMIN_COOKIE, token, { ...cookieOptions, maxAge: SESSION_MS })
  res.json({ email: env.adminEmail })
})

export function logout(req, res) {
  res.clearCookie(ADMIN_COOKIE, cookieOptions)
  res.json({ ok: true })
}

export function me(req, res) {
  res.json({ email: env.adminEmail })
}
