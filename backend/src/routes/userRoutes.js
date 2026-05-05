import { Router } from 'express';
import { claimCertificate, completeModule, getUserCertificates, getUserStats, submitTestResult, getProfile, updateProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

router.get('/stats', authMiddleware, getUserStats);
router.post('/complete-module', authMiddleware, completeModule);
router.post('/submit-test', authMiddleware, submitTestResult);
router.post('/claim-certificate', authMiddleware, claimCertificate);
router.get('/certificates', authMiddleware, getUserCertificates);

export default router;
