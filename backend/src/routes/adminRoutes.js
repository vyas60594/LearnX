import { Router } from 'express';
import { getAdminStats } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/stats', authMiddleware, getAdminStats);

export default router;
