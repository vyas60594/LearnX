import { Router } from 'express';
import { getAllPracticeTests, getPracticeTestById } from '../controllers/practiceTestController.js';

const router = Router();

router.get('/', getAllPracticeTests);
router.get('/:id', getPracticeTestById);

export default router;
