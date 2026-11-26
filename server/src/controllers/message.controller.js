import { Message } from '../models/index.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { httpError } from '../utils/httpError.js'
import { asString, escapeRegex, isEmail } from '../utils/sanitize.js'

/** Public contact form. */
export const createMessage = asyncHandler(async (req, res) => {
  const name = asString(req.body?.name, 100)
  const email = asString(req.body?.email, 200)
  const subject = asString(req.body?.subject, 150)
  const message = asString(req.body?.message, 3000)

  const valid = name.length >= 2 && isEmail(email) && subject.length >= 3 && message.length >= 10
  if (!valid) throw httpError(400, 'Check your name, email, subject and message.')

  await Message.create({ name, email, subject, message })
  res.status(201).json({ ok: true })
})

export const listMessages = asyncHandler(async (req, res) => {
  const query = asString(req.query.q, 100)
  const filter = {}

  if (query) {
    const pattern = new RegExp(escapeRegex(query), 'i')
    filter.$or = [{ name: pattern }, { email: pattern }, { subject: pattern }, { message: pattern }]
  }
  if (req.query.status === 'unread') filter.read = false
  if (req.query.status === 'read') filter.read = true

  res.json(await Message.find(filter).sort({ createdAt: -1 }).limit(200).lean())
})

export const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { read: req.body?.read !== false },
    { new: true },
  )
  res.json(message)
})

export const deleteMessage = asyncHandler(async (req, res) => {
  await Message.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})
