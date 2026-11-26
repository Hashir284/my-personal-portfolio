import express from 'express'
import { UPLOAD_JSON_LIMIT } from '../config/constants.js'
import { uploadFile } from '../controllers/upload.controller.js'
import { requireAdmin } from '../middleware/auth.js'

/**
 * Mounted before the global body parser (see app.js): auth is checked before the
 * large body is read, and images get their own 5 MB limit.
 */
const router = express.Router()

router.post('/upload', requireAdmin, express.json({ limit: UPLOAD_JSON_LIMIT }), uploadFile)

export default router
