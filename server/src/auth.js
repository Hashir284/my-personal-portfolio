import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const DUMMY_HASH = bcrypt.hashSync('not-the-password', 10) // equal timing when the email is wrong
const prod = process.env.NODE_ENV === 'production'
// Cross-site (Vercel -> API host) cookies need SameSite=None + Secure in production.
const cookieOpts = { httpOnly: true, secure: prod, sameSite: prod ? 'none' : 'lax', path: '/' }

export async function login(req, res) {
  const { email, password } = req.body || {}
  if (typeof email !== 'string' || typeof password !== 'string') return res.status(400).json({ error: 'Email and password are required.' })
  const emailOk = email.trim().toLowerCase() === (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const passOk = await bcrypt.compare(password, emailOk ? process.env.ADMIN_PASSWORD_HASH : DUMMY_HASH)
  if (!emailOk || !passOk) return res.status(401).json({ error: 'Wrong email or password.' })
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' })
  res.cookie('admin_token', token, { ...cookieOpts, maxAge: 12 * 60 * 60 * 1000 })
  res.json({ email: process.env.ADMIN_EMAIL })
}

export function logout(req, res) {
  res.clearCookie('admin_token', cookieOpts)
  res.json({ ok: true })
}

export function requireAdmin(req, res, next) {
  try {
    const payload = jwt.verify(req.cookies?.admin_token || '', process.env.JWT_SECRET)
    if (payload.role !== 'admin') throw new Error('role')
    next()
  } catch {
    res.status(401).json({ error: 'Please log in.' })
  }
}

export const me = (req, res) => res.json({ email: process.env.ADMIN_EMAIL })
