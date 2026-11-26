import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema(
  { label: String, href: String, primary: Boolean },
  { _id: false },
)

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 120 },
    kicker: { type: String, default: '', maxlength: 120 },
    description: { type: String, default: '', maxlength: 1200 },
    features: [String],
    tech: [String],
    links: [linkSchema],
    github: { type: String, default: '' },
    image: { type: String, default: '' },
    mock: { type: String, enum: ['store', 'app'], default: 'app' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
)

projectSchema.index({ published: 1, featured: -1, order: 1 })

export const Project = mongoose.model('Project', projectSchema)
