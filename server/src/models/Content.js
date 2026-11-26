import mongoose from 'mongoose'

/**
 * Every editable section (profile, hero, about, skills, certificates, education,
 * services, settings) lives in one document under `data`, one key per section.
 */
const contentSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { minimize: false, timestamps: true },
)

export const Content = mongoose.model('Content', contentSchema)
