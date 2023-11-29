import express from 'express';
const router = express.Router();

// Controllers
import { addBook, getAllBooks, getOneBook, updateBook, deleteBook, searchBookByTitle } from '../controllers/bookController.js';

// Add a new book
router.post('/add', addBook);

// Get all books
router.get('/', getAllBooks);

// Get a specific book
router.get('/:id', getOneBook);

// Update a specific book
router.put('/:id', updateBook);

// Delete a specific book
router.delete('/:id', deleteBook);

// Search for a book by title
router.get('/search', searchBookByTitle);

export default router;

