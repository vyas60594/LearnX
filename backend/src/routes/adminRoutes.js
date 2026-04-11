import { Router } from 'express';
import { getAdminStats, getAllUsers, inviteUser, updateUser } from '../controllers/adminController.js';
import { 
  getSkillPaths, 
  getSkillPathById, 
  createSkillPath, 
  updateSkillPath, 
  deleteSkillPath 
} from '../controllers/skillPathController.js';
import {
  getAllPracticeTests,
  getPracticeTestById,
  createPracticeTest,
  updatePracticeTest,
  deletePracticeTest,
  addQuestion,
  updateQuestion,
  deleteQuestion
} from '../controllers/practiceTestController.js';
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

// Practice Test Routes
router.get('/practice-tests', authMiddleware, getAllPracticeTests);
router.get('/practice-tests/:id', authMiddleware, getPracticeTestById);
router.post('/practice-tests', authMiddleware, createPracticeTest);
router.put('/practice-tests/:id', authMiddleware, updatePracticeTest);
router.delete('/practice-tests/:id', authMiddleware, deletePracticeTest);

// Question Routes
router.post('/practice-tests/:test_id/questions', authMiddleware, addQuestion);
router.put('/questions/:id', authMiddleware, updateQuestion);
router.delete('/questions/:id', authMiddleware, deleteQuestion);

export default router;
