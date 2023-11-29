import express from 'express';
const router = express.Router();

// Controllers
const { 
    submitFeedback, 
    getAllFeedbacks, 
    getOneFeedback, 
    updateFeedback, 
    deleteFeedback 
} = require('../controllers/feedbackController');

// Routes
router.post('/submit', submitFeedback);
router.get('/', getAllFeedbacks);
router.get('/:id', getOneFeedback);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;
