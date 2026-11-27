import { assertEnv, cloudinaryReady, env } from './config/env.js'
import { connectDatabase } from './config/db.js'
import app from './app.js'
import { mainApp } from './app.js'

async function start() {
  assertEnv()

  if (!cloudinaryReady()) {
    console.warn('Cloudinary is not configured')
  }

  await connectDatabase()
  mainApp()

  app.listen(env.port, () => {
    console.log(`API running on port ${env.port}`)
  })
}

start().catch((error) => {
  console.error('Failed to start:', error.message)
  process.exit(1)
})
