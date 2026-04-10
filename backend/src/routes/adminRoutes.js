import { Router } from 'express';
import { getAdminStats, getAllUsers, inviteUser, updateUser } from '../controllers/adminController.js';
import { 
  getSkillPaths, 
  getSkillPathById, 
  createSkillPath, 
  updateSkillPath, 
  deleteSkillPath 
} from '../controllers/skillPathController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/stats', authMiddleware, getAdminStats);
router.get('/users', authMiddleware, getAllUsers);
router.put('/users/:id', authMiddleware, updateUser);
router.post('/invite', authMiddleware, inviteUser);

// Skill Path Routes
router.get('/skill-paths', authMiddleware, getSkillPaths);
router.get('/skill-paths/:id', authMiddleware, getSkillPathById);
router.post('/skill-paths', authMiddleware, createSkillPath);
router.put('/skill-paths/:id', authMiddleware, updateSkillPath);
router.delete('/skill-paths/:id', authMiddleware, deleteSkillPath);

export default router;
