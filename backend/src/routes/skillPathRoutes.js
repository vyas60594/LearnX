import { Router } from 'express';
import { getSkillPaths, getSkillPathById } from '../controllers/skillPathController.js';

const router = Router();

router.get('/', getSkillPaths);
router.get('/:id', getSkillPathById);

export default router;
