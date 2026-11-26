export const CONTENT_KEY = 'main'

/** Sections that can be switched off from the admin panel. */
export const CONTENT_SECTIONS = [
  'about',
  'skills',
  'services',
  'projects',
  'certificates',
  'education',
  'github',
]

export const JSON_BODY_LIMIT = '100kb'
export const UPLOAD_JSON_LIMIT = '5mb'
export const UPLOAD_MAX_BYTES = 3 * 1024 * 1024
export const UPLOAD_MIME_TYPES = new Set(['image/webp', 'image/png', 'image/jpeg', 'application/pdf'])
