const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    available: { type: Boolean, default: true }
});

const Book = mongoose.model('Book', booksSchema);
