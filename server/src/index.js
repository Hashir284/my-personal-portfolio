import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app.js'
import { cloudReady } from './cloud.js'

const missing = ['MONGODB_URI', 'JWT_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD_HASH'].filter((k) => !process.env[k])
if (missing.length) { console.error(`Missing in server/.env: ${missing.join(', ')}`); process.exit(1) }
if (process.env.JWT_SECRET.length < 32) { console.error('JWT_SECRET must be at least 32 characters.'); process.exit(1) }
if (!cloudReady()) console.warn('Cloudinary is not configured: image and resume uploads are disabled until CLOUDINARY_* are set. Everything else works.')

await mongoose.connect(process.env.MONGODB_URI)
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`API running on http://localhost:${port}`))
