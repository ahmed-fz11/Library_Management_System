import { Request, Response } from 'express';

// Mongoose Model
const BorrowedBook = require('../models/borrowedbooks');

// Borrow a book
export const borrowBook = async (req, res) => {
    try {
        const borrowedBook = await BorrowedBook.create(req.body);
        res.status(201).json(borrowedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all borrowed books
export const getAllBorrowedBooks = async (req, res) => {
    try {
        const borrowedBooks = await BorrowedBook.find()
            .populate('student')
            .populate('book')
            .populate('staff');
        res.status(200).json(borrowedBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get one borrowed book
export const getOneBorrowedBook = async (req, res) => {
    try {
        const borrowedBook = await BorrowedBook.findById(req.params.id)
            .populate('student')
            .populate('book')
            .populate('staff');
        if (!borrowedBook) {
            return res.status(404).json({ error: 'Borrowed book not found' });
        }
        res.status(200).json(borrowedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a borrowed book record
export const updateBorrowedBook = async (req, res) => {
    try {
        const borrowedBook = await BorrowedBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!borrowedBook) {
            return res.status(404).json({ error: 'Borrowed book not found' });
        }
        res.status(200).json(borrowedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a borrowed book record
export const deleteBorrowedBook = async (req, res) => {
    try {
        const borrowedBook = await BorrowedBook.findByIdAndDelete(req.params.id);
        if (!borrowedBook) {
            return res.status(404).json({ error: 'Borrowed book not found' });
        }
        res.status(200).json({ message: 'Borrowed book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
