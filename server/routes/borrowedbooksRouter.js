import express from 'express';
const router = express.Router();

import {
    borrowBook,
    getAllBorrowedBooks,
    getOneBorrowedBook,
    updateBorrowedBook,
    deleteBorrowedBook,
    getBorrowedBooksByStatus
} from '../controllers/borrowedbooksController.js';

// Routes
router.post('/borrow', borrowBook);
router.post('/all', getAllBorrowedBooks); 
router.post('/get', getOneBorrowedBook); 
router.post('/update', updateBorrowedBook); 
router.post('/delete', deleteBorrowedBook); 
router.post('/status', getBorrowedBooksByStatus);

export default router;
