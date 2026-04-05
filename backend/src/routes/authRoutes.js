import { Router } from 'express';
import { registerUser, loginUser, getUsers, getMe } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);
router.get('/users', getUsers);

export default router;
