import mongoose from 'mongoose'
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 120 },
  kicker: { type: String, default: '', maxlength: 120 },
  description: { type: String, default: '', maxlength: 1200 },
  features: [String],
  tech: [String],
  links: [{ _id: false, label: String, href: String, primary: Boolean }],
  github: { type: String, default: '' },
  image: { type: String, default: '' },
  mock: { type: String, enum: ['store', 'app'], default: 'app' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true })
projectSchema.index({ published: 1, featured: -1, order: 1 })
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 200 },
  subject: { type: String, default: '', maxlength: 150 },
  message: { type: String, required: true, maxlength: 3000 },
  read: { type: Boolean, default: false },
}, { timestamps: true })
messageSchema.index({ createdAt: -1 })
// Everything else (profile, hero, about, skills, certificates, education, services, settings) lives in one document, one key per section.
const contentSchema = new mongoose.Schema({ key: { type: String, unique: true }, data: { type: mongoose.Schema.Types.Mixed, default: {} } }, { minimize: false, timestamps: true })
export const Project = mongoose.model('Project', projectSchema)
export const Message = mongoose.model('Message', messageSchema)
export const Content = mongoose.model('Content', contentSchema)
