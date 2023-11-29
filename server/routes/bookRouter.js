import express from 'express';
const router = express.Router();

// Controllers
const { addBook, getAllBooks, getOneBook, updateBook, deleteBook } = require('../controllers/bookController');

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

module.exports = router;
