import 'dotenv/config'

const list = (value = '') =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  adminEmail: (process.env.ADMIN_EMAIL || '').trim(),
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || '',
  clientOrigins: list(process.env.CLIENT_ORIGIN || 'http://localhost:5173'),
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
}

export const cloudinaryReady = () =>
  Boolean(env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret)

/** Fail fast on a broken configuration instead of crashing later mid-request. */
export function assertEnv() {
  const required = {
    MONGODB_URI: env.mongoUri,
    JWT_SECRET: env.jwtSecret,
    ADMIN_EMAIL: env.adminEmail,
    ADMIN_PASSWORD_HASH: env.adminPasswordHash,
  }
  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length) throw new Error(`Missing in server/.env: ${missing.join(', ')}`)
  if (env.jwtSecret.length < 32) throw new Error('JWT_SECRET must be at least 32 characters.')
  if (!env.clientOrigins.length) throw new Error('CLIENT_ORIGIN must list at least one origin.')
}
