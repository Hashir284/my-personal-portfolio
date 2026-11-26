import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { login, logout, me, requireAdmin } from './auth.js'
import { Project, Message, Content } from './models.js'
import { uploadToCloud, cloudReady } from './cloud.js'

const app = express()
const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim())
app.set('trust proxy', 1)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors({ origin: origins, credentials: true }))
app.use(cookieParser())
// CSRF defence for cookie auth: state-changing requests must come from an allowed site.
app.use((req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next()
  return origins.includes(req.headers.origin) ? next() : res.status(403).json({ error: 'Origin not allowed.' })
})

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many attempts. Try again in 15 minutes.' } })
const messageLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many messages. Try again later.' } })

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const list = (v, max = 30) => (Array.isArray(v) ? v.map((x) => str(x, 200)).filter(Boolean).slice(0, max) : [])
const arr = (v, n) => (Array.isArray(v) ? v.slice(0, n) : [])
const url = (v) => { const s = str(v, 500); return /^https?:\/\//i.test(s) ? s : '' }
const asset = (v) => { const s = str(v, 500); return /^(https?:\/\/|\/(?!\/))/i.test(s) ? s : '' }
const validId = (req, res, next) => (mongoose.isValidObjectId(req.params.id) ? next() : res.status(400).json({ error: 'Invalid id.' }))
const wrap = (fn) => (req, res, next) => fn(req, res).catch(next)
const MIME = new Set(['image/webp', 'image/png', 'image/jpeg', 'application/pdf'])
const SECTIONS = ['about', 'skills', 'services', 'projects', 'certificates', 'education', 'github']

// Upload to Cloudinary (admin only; auth is checked BEFORE the large body is parsed).
app.post('/api/admin/upload', requireAdmin, express.json({ limit: '5mb' }), wrap(async (req, res) => {
  if (!cloudReady()) return res.status(503).json({ error: 'Uploads are not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to server/.env.' })
  const dataUrl = String(req.body?.dataUrl || '')
  const m = /^data:([\w/+.-]+);base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl)
  if (!m || !MIME.has(m[1])) return res.status(400).json({ error: 'Only WebP, PNG, JPEG or PDF files are allowed.' })
  if (Math.floor((m[2].length * 3) / 4) > 3 * 1024 * 1024) return res.status(400).json({ error: 'File is too large (max 3 MB).' })
  res.status(201).json({ url: await uploadToCloud(dataUrl, m[1] === 'application/pdf') })
}))

app.use(express.json({ limit: '100kb' }))

function cleanContent(b = {}) {
  const o = {}
  if (b.profile) { const p = b.profile; o.profile = { name: str(p.name, 80), title: str(p.title, 120), location: str(p.location, 120), email: str(p.email, 200), phone: str(p.phone, 40), github: url(p.github), linkedin: url(p.linkedin), resume: asset(p.resume) } }
  if (b.hero) { const h = b.hero; o.hero = { headline: str(h.headline, 120), subtitle: str(h.subtitle, 120), intro: str(h.intro, 500), availability: str(h.availability, 80), primaryText: str(h.primaryText, 30), secondaryText: str(h.secondaryText, 30) } }
  if ('portrait' in b) o.portrait = asset(b.portrait)
  if (b.about) o.about = { paragraphs: arr(b.about.paragraphs, 8).map((t) => str(t, 900)).filter(Boolean), facts: arr(b.about.facts, 6).map((f) => ({ big: str(f?.big, 20), label: str(f?.label, 60) })).filter((f) => f.big && f.label) }
  if (b.skills) o.skills = arr(b.skills, 12).map((g) => ({ title: str(g?.title, 40), icon: str(g?.icon, 30), items: arr(g?.items, 40).map((i) => ({ name: str(i?.name, 50), icon: str(i?.icon, 30), level: ['core', 'learning'].includes(i?.level) ? i.level : '', published: i?.published !== false })).filter((i) => i.name) })).filter((g) => g.title)
  if (b.timeline) o.timeline = arr(b.timeline, 10).map((t) => ({ title: str(t?.title, 120), place: str(t?.place, 120), period: str(t?.period, 60), status: str(t?.status, 60), note: str(t?.note, 300) })).filter((t) => t.title)
  if (b.certificates) o.certificates = arr(b.certificates, 30).map((c) => ({ title: str(c?.title, 120), organization: str(c?.organization, 120), event: str(c?.event, 120), issueDate: str(c?.issueDate, 40), duration: str(c?.duration, 40), number: str(c?.number, 80), image: asset(c?.image), published: c?.published !== false })).filter((c) => c.title && c.image)
  if (b.services) o.services = arr(b.services, 12).map((x) => ({ title: str(x?.title, 60), icon: str(x?.icon, 30), text: str(x?.text, 250), published: x?.published !== false })).filter((x) => x.title)
  if (b.settings) { const s = b.settings; o.settings = { siteTitle: str(s.siteTitle, 90), siteDescription: str(s.siteDescription, 200), announcement: str(s.announcement, 200), footerText: str(s.footerText, 200), visibility: Object.fromEntries(SECTIONS.map((k) => [k, s.visibility?.[k] !== false])) } }
  return o
}

function cleanProject(b = {}) {
  const links = arr(b.links, 4).map((l, i) => ({ label: str(l?.label, 40), href: url(l?.href), primary: i === 0 })).filter((l) => l.label && l.href)
  return {
    title: str(b.title, 120), kicker: str(b.kicker, 120), description: str(b.description, 1200),
    features: list(b.features), tech: list(b.tech, 15), links, github: url(b.github), image: asset(b.image),
    mock: b.mock === 'store' ? 'store' : 'app', featured: b.featured === true, order: Number.isFinite(+b.order) ? +b.order : 0, published: b.published !== false,
  }
}

app.get('/api/health', (_, res) => res.json({ ok: true }))

// Public (published content only)
app.get('/api/content', wrap(async (_, res) => { const d = await Content.findOne({ key: 'main' }).lean(); res.json(d?.data || {}) }))
app.get('/api/projects', wrap(async (_, res) => res.json(await Project.find({ published: true }).sort({ featured: -1, order: 1, createdAt: 1 }).lean())))
app.post('/api/messages', messageLimiter, wrap(async (req, res) => {
  const name = str(req.body?.name, 100), email = str(req.body?.email, 200), subject = str(req.body?.subject, 150), message = str(req.body?.message, 3000)
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || subject.length < 3 || message.length < 10) return res.status(400).json({ error: 'Check your name, email, subject and message.' })
  await Message.create({ name, email, subject, message })
  res.status(201).json({ ok: true })
}))

// Auth
app.post('/api/auth/login', loginLimiter, wrap(login))
app.post('/api/auth/logout', logout)
app.get('/api/auth/me', requireAdmin, me)

// Admin only
const admin = express.Router()
admin.use(requireAdmin)
admin.get('/stats', wrap(async (_, res) => {
  const [projects, messages, unread, recent, content] = await Promise.all([
    Project.countDocuments(), Message.countDocuments(), Message.countDocuments({ read: false }),
    Message.find().sort({ createdAt: -1 }).limit(5).lean(), Content.findOne({ key: 'main' }).lean(),
  ])
  res.json({ projects, messages, unread, recent, updatedAt: content?.updatedAt || null })
}))
admin.put('/content', wrap(async (req, res) => {
  const $set = Object.fromEntries(Object.entries(cleanContent(req.body)).map(([k, v]) => [`data.${k}`, v]))
  if (!Object.keys($set).length) return res.status(400).json({ error: 'Nothing to save.' })
  const d = await Content.findOneAndUpdate({ key: 'main' }, { $set }, { upsert: true, new: true }).lean()
  res.json(d.data)
}))
admin.get('/projects', wrap(async (_, res) => res.json(await Project.find().sort({ order: 1, createdAt: 1 }).lean())))
admin.post('/projects', wrap(async (req, res) => {
  const data = cleanProject(req.body)
  if (!data.title) return res.status(400).json({ error: 'Title is required.' })
  res.status(201).json(await Project.create(data))
}))
admin.put('/projects/:id', validId, wrap(async (req, res) => {
  const data = cleanProject(req.body)
  if (!data.title) return res.status(400).json({ error: 'Title is required.' })
  const doc = await Project.findByIdAndUpdate(req.params.id, data, { new: true })
  doc ? res.json(doc) : res.status(404).json({ error: 'Not found.' })
}))
admin.delete('/projects/:id', validId, wrap(async (req, res) => { await Project.findByIdAndDelete(req.params.id); res.json({ ok: true }) }))
admin.get('/messages', wrap(async (req, res) => {
  const q = str(req.query.q, 100), f = {}
  if (q) { const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'); f.$or = [{ name: re }, { email: re }, { subject: re }, { message: re }] }
  if (req.query.status === 'unread') f.read = false
  if (req.query.status === 'read') f.read = true
  res.json(await Message.find(f).sort({ createdAt: -1 }).limit(200).lean())
}))
admin.patch('/messages/:id', validId, wrap(async (req, res) => res.json(await Message.findByIdAndUpdate(req.params.id, { read: req.body?.read !== false }, { new: true }))))
admin.delete('/messages/:id', validId, wrap(async (req, res) => { await Message.findByIdAndDelete(req.params.id); res.json({ ok: true }) }))
app.use('/api/admin', admin)

app.use((req, res) => res.status(404).json({ error: 'Not found.' }))
app.use((err, req, res, next) => { console.error(err.message); res.status(500).json({ error: 'Server error.' }) }) // eslint-disable-line no-unused-vars

export default app
