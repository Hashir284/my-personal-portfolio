import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, maxlength: 200 },
    subject: { type: String, default: '', maxlength: 150 },
    message: { type: String, required: true, maxlength: 3000 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
)

messageSchema.index({ createdAt: -1 })

export const Message = mongoose.model('Message', messageSchema)
