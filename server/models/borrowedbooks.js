const mongoose = require('mongoose');

const borrowedBooksSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, default: 'issued', enum: ['issued', 'overdue', 'returned'] }
});

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBooksSchema);
