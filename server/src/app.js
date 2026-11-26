import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { env } from './config/env.js'
import { JSON_BODY_LIMIT, UPLOAD_JSON_LIMIT } from './config/constants.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { requireTrustedOrigin } from './middleware/trustedOrigin.js'
import routes from './routes/index.js'
import uploadRoutes from './routes/upload.routes.js'

const app = express()

app.set('trust proxy', 1)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors({ origin: env.clientOrigins, credentials: true }))
app.use(cookieParser())
app.use(requireTrustedOrigin)

/**
 * Uploads are mounted first, with their own larger body limit, so the small
 * default JSON limit never rejects an image and auth runs before parsing.
 */
app.use('/api/admin', uploadRoutes)
app.use(express.json({ limit: JSON_BODY_LIMIT }))
app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)

export default app
