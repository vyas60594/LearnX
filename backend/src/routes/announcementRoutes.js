import { Router } from 'express';
import { 
    getAnnouncements, 
    createAnnouncement, 
    deleteAnnouncement, 
    updateAnnouncement 
} from '../controllers/announcementController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Public / User routes
router.get('/', getAnnouncements);

// Admin routes (protected)
router.post('/', authMiddleware, createAnnouncement);
router.put('/:id', authMiddleware, updateAnnouncement);
router.delete('/:id', authMiddleware, deleteAnnouncement);

export default router;
