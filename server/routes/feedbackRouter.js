import express from 'express';
const router = express.Router();

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
router.post('/all', getAllFeedbacks); 
router.post('/get', getOneFeedback); 
router.post('/update', updateFeedback); 
router.delete('/delete', deleteFeedback); 
router.post('/category', getFeedbackByCategory);

export default router;
