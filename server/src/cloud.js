import { v2 as cloudinary } from 'cloudinary'

export const cloudReady = () => !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)

export async function uploadToCloud(dataUrl, isPdf) {
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, secure: true })
  const r = await cloudinary.uploader.upload(dataUrl, { folder: 'portfolio', resource_type: isPdf ? 'raw' : 'image' })
  return r.secure_url
}
