import { Router } from 'express'
import adminRoutes from './admin.routes.js'
import authRoutes from './auth.routes.js'
import publicRoutes from './public.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/admin', adminRoutes)
router.use(publicRoutes)

export default router
