import express from 'express';
const router = express.Router();

// Controllers
const { 
    borrowBook, 
    getAllBorrowedBooks, 
    getOneBorrowedBook, 
    updateBorrowedBook, 
    deleteBorrowedBook,
    getBorrowedBooksByStatus 
} = require('../controllers/borrowedBooksController');

// Routes
router.post('/borrow', borrowBook);
router.get('/', getAllBorrowedBooks);
router.get('/:id', getOneBorrowedBook);
router.put('/:id', updateBorrowedBook);
router.delete('/:id', deleteBorrowedBook);
router.get('/status/:status', getBorrowedBooksByStatus);

module.exports = router;
