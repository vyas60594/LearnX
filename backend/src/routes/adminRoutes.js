import { Router } from 'express';
import { getAdminStats, getAllUsers, updateUser, inviteUser } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/stats', authMiddleware, getAdminStats);
router.get('/users', authMiddleware, getAllUsers);
router.put('/users/:id', authMiddleware, updateUser);
router.post('/invite', authMiddleware, inviteUser);

export default router;
