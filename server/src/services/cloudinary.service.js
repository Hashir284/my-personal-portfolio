import { v2 as cloudinary } from 'cloudinary'
import { cloudinaryReady, env } from '../config/env.js'
import { httpError } from '../utils/httpError.js'

function configure() {
  cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
    secure: true,
  })
}

export async function uploadToCloudinary(dataUrl, isPdf) {
  if (!cloudinaryReady()) {
    throw httpError(503, 'Uploads are not configured. Add the CLOUDINARY_* variables to server/.env.')
  }
  configure()
  const result = await cloudinary.uploader.upload(dataUrl, {
    folder: 'portfolio',
    resource_type: isPdf ? 'raw' : 'image',
  })
  return result.secure_url
}
