// import mongoose from 'mongoose'
// import { env } from './env.js'

// export async function connectDatabase() {
//   mongoose.set('strictQuery', true)
//   await mongoose.connect(env.mongoUri)
//   return mongoose.connection
// }

import mongoose from 'mongoose'
import { env } from './env.js'

mongoose.set('strictQuery', true)

let cached = global._mongooseCache
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null }
}

export async function connectDatabase() {
  if (!env.mongoUri) {
    throw new Error('Missing env.mongoUri')
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(env.mongoUri)
      .then((m) => m.connection)
      .catch((err) => {
        cached.promise = null
        console.error('MongoDB connection error:', err.message)
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}