import mongoose from 'mongoose'
import { env } from './env.js'

mongoose.set('strictQuery', true)

// A warm serverless instance reuses this cache instead of reconnecting.
let cached = global._mongooseCache
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null }
}

export async function connectDatabase() {
  if (!env.mongoUri) {
    throw new Error('MONGODB_URI is not set.')
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(env.mongoUri, {
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 5,
      })
      .then((m) => m.connection)
      .catch((error) => {
        cached.promise = null
        console.error('MongoDB connection failed:', error.message)
        throw error
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}