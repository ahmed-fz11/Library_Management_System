// import { Request, Response } from 'express';
import express from 'express';
// Mongoose Model
import Book from '../models/book.js';

// Add a new book
export const addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get one book
export const getOneBook = async (req, res) => {
    try {
        const bookId = req.body.id;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a book
export const updateBook = async (req, res) => {
    try {
        const bookId = req.body.id;
        const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const bookId = req.body.id;
        const book = await Book.findByIdAndDelete(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for a book by title
export const searchBookByTitle = async (req, res) => {
    try {
        const query = req.body.name;
        const books = await Book.find({ name: new RegExp(query, 'i') });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
