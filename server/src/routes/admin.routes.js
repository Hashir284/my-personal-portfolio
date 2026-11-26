import { Router } from 'express'
import { updateContent } from '../controllers/content.controller.js'
import {
  createMessage,
  deleteMessage,
  listMessages,
  updateMessage,
} from '../controllers/message.controller.js'
import {
  createProject,
  deleteProject,
  listProjects,
  updateProject,
} from '../controllers/project.controller.js'
import { getStats } from '../controllers/stats.controller.js'
import { requireAdmin } from '../middleware/auth.js'
import { validateObjectId } from '../middleware/validateObjectId.js'

const router = Router()

router.use(requireAdmin)

router.get('/stats', getStats)
router.put('/content', updateContent)

router.get('/projects', listProjects)
router.post('/projects', createProject)
router.put('/projects/:id', validateObjectId, updateProject)
router.delete('/projects/:id', validateObjectId, deleteProject)

router.get('/messages', listMessages)
router.patch('/messages/:id', validateObjectId, updateMessage)
router.delete('/messages/:id', validateObjectId, deleteMessage)

export default router
