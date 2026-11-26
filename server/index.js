import { assertEnv, cloudinaryReady, env } from './src/config/env.js'
import { connectDatabase } from './src/config/db.js'
import app from './src/app.js'

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

start().catch((error) => {
  console.error('Failed to start:', error.message)
  process.exit(1)
})