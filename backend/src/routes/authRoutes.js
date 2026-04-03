import { Router } from 'express';
import { registerUser, getUsers } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerUser);
router.get('/users', getUsers);

export default router;
