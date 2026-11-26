import rateLimit from 'express-rate-limit'

const defaults = { standardHeaders: true, legacyHeaders: false }

/** 10 login attempts per 15 minutes. */
export const loginLimiter = rateLimit({
  ...defaults,
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts. Try again in 15 minutes.' },
})

/** 5 contact messages per hour. */
export const messageLimiter = rateLimit({
  ...defaults,
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages. Try again later.' },
})
