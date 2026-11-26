import mongoose from 'mongoose'

/** Rejects malformed MongoDB ids before they reach a query. */
export function validateObjectId(req, res, next) {
  return mongoose.isValidObjectId(req.params.id)
    ? next()
    : res.status(400).json({ error: 'Invalid id.' })
}
