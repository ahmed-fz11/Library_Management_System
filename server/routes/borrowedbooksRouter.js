import express from 'express';
const router = express.Router();

// Controllers
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
router.get('/', getAllBorrowedBooks);
router.get('/:id', getOneBorrowedBook);
router.put('/:id', updateBorrowedBook);
router.delete('/:id', deleteBorrowedBook);
router.get('/status/:status', getBorrowedBooksByStatus);

export default router;

