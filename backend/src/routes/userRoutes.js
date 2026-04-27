import { Router } from 'express';
import { getUserStats, completeModule, submitTestResult } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/stats', authMiddleware, getUserStats);
router.post('/complete-module', authMiddleware, completeModule);
router.post('/submit-test', authMiddleware, submitTestResult);

export default router;
