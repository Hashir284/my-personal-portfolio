import { CONTENT_KEY } from '../config/constants.js'
import { Content, Message, Project } from '../models/index.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getStats = asyncHandler(async (req, res) => {
  const [projects, messages, unread, recent, content] = await Promise.all([
    Project.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ read: false }),
    Message.find().sort({ createdAt: -1 }).limit(5).lean(),
    Content.findOne({ key: CONTENT_KEY }).lean(),
  ])

  res.json({ projects, messages, unread, recent, updatedAt: content?.updatedAt || null })
})
