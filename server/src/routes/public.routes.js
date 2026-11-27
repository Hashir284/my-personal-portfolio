import { Router } from 'express'
import { getContent } from '../controllers/content.controller.js'
import { createMessage } from '../controllers/message.controller.js'
import { listPublishedProjects } from '../controllers/project.controller.js'
import { messageLimiter } from '../middleware/rateLimiters.js'

const router = Router()

router.get('/health', async(req, res) => {
  await connectDatabase()
  res.json({
  ok: true 
}))}
router.get('/content', getContent)
router.get('/projects', listPublishedProjects)
router.post('/messages', messageLimiter, createMessage)

export default router
