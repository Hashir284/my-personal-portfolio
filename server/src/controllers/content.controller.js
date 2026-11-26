import { CONTENT_KEY } from '../config/constants.js'
import { Content } from '../models/index.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { httpError } from '../utils/httpError.js'
import { sanitizeContent } from '../utils/sanitizeContent.js'

export const getContent = asyncHandler(async (req, res) => {
  const doc = await Content.findOne({ key: CONTENT_KEY }).lean()
  res.json(doc?.data || {})
})

/** Only the sections present in the request body are written. */
export const updateContent = asyncHandler(async (req, res) => {
  const sections = sanitizeContent(req.body)
  const keys = Object.keys(sections)
  if (!keys.length) throw httpError(400, 'Nothing to save.')

  const update = Object.fromEntries(keys.map((key) => [`data.${key}`, sections[key]]))
  const doc = await Content.findOneAndUpdate(
    { key: CONTENT_KEY },
    { $set: update },
    { upsert: true, new: true },
  ).lean()

  res.json(doc.data)
})
