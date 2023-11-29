import express from 'express';
const router = express.Router();

import { 
    addBook, 
    getAllBooks, 
    getOneBook, 
    updateBook, 
    deleteBook, 
    searchBookByTitle 
} from '../controllers/bookController.js';

// Add a new book
router.post('/add', addBook);

// Get all books 
router.post('/all', getAllBooks);

// Get a specific book 
router.post('/get', getOneBook);

// Update a specific book
router.post('/update', updateBook);

// Delete a specific book 
router.post('/delete', deleteBook);

// Search for a book by title 
router.post('/search', searchBookByTitle);

export default router;
