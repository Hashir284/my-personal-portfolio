import { assertEnv, cloudinaryReady, env } from './config/env.js'
import { connectDatabase } from './config/db.js'
import app from './app.js'

// Vercel uses this default export as the serverless entry point for the API.
export default app

async function start() {
  assertEnv()

  if (!cloudinaryReady()) {
    console.warn('Cloudinary is not configured')
  }

  await connectDatabase()

  app.listen(env.port, () => {
    console.log(`API running on port ${env.port}`)
  })
}

// Locally we keep a normal HTTP server. On Vercel the exported app is invoked
// per request instead, so nothing is started here.
if (!process.env.VERCEL) {
  start().catch((error) => {
    console.error('Failed to start:', error.message)
    process.exit(1)
  })
}
