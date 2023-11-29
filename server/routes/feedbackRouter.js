import express from 'express';
const router = express.Router();

// Controllers
import { 
    submitFeedback, 
    getAllFeedbacks, 
    getOneFeedback, 
    updateFeedback, 
    deleteFeedback,
    getFeedbackByCategory
} from '../controllers/feedbackController.js';


// Routes
router.post('/submit', submitFeedback);
router.get('/', getAllFeedbacks);
router.get('/:id', getOneFeedback);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);
router.get('/category/:category', getFeedbackByCategory);

export default router;

