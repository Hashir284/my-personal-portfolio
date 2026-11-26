import { UPLOAD_MAX_BYTES, UPLOAD_MIME_TYPES } from '../config/constants.js'
import { uploadToCloudinary } from '../services/cloudinary.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { parseDataUrl } from '../utils/dataUrl.js'
import { httpError } from '../utils/httpError.js'

export const uploadFile = asyncHandler(async (req, res) => {
  const { mime, base64, bytes } = parseDataUrl(req.body?.dataUrl)

  if (!UPLOAD_MIME_TYPES.has(mime)) throw httpError(400, 'Only WebP, PNG, JPEG or PDF files are allowed.')
  if (bytes > UPLOAD_MAX_BYTES) throw httpError(400, 'File is too large (max 3 MB).')

  const url = await uploadToCloudinary(`data:${mime};base64,${base64}`, mime === 'application/pdf')
  res.status(201).json({ url })
})
