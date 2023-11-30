import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Book from './models/book.js';
import BorrowedBook from './models/borrowedbooks.js';
import Feedback from './models/feedback.js';
import Manager from './models/manager.js';
import Staff from './models/staff.js';
import Student from './models/student.js';

dotenv.config();

async function initializeDatabase() {
  try {
    await mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');

    await Book.deleteMany({});
    await BorrowedBook.deleteMany({});
    await Feedback.deleteMany({});
    await Staff.deleteMany({});
    await Student.deleteMany({});
    await Manager.deleteMany({});

    // Dummy data for Manager model
    const managersData = [
    { name: 'Manager1', gender: 'Male', email: 'manager1@example.com', password: 'password' },
    { name: 'Manager2', gender: 'Female', email: 'manager2@example.com', password: 'password' },
    { name: 'Manager3', gender: 'Other', email: 'manager3@example.com', password: 'password' },
    // Add more entries as needed
    ];

    // Dummy data for Book model
    const booksData = [
      { name: 'Book1', author: 'Author1' },
      { name: 'Book2', author: 'Author2' },
      { name: 'Book3', author: 'Author3' },
      // Add more entries as needed
    ];

    // Dummy data for Student model
    const studentsData = [
      { name: 'Student1', phoneNo: '1234567890', gender: 'Other', email: 'student1@example.com', password: 'password' },
      { name: 'Student2', phoneNo: '9876543210', gender: 'Female', email: 'student2@example.com', password: 'password' },
      // Add more entries as needed
    ];

    // Dummy data for Staff model
    const staffData = [
      { name: 'Staff1', gender: 'Female', location: 'IT Services', performance: 3, salary: mongoose.Types.Decimal128.fromString('50000.00'), email: 'staff1@example.com', password: 'password' },
      { name: 'Staff2', gender: 'Male', location: 'Children Section', performance: 4, salary: mongoose.Types.Decimal128.fromString('55000.00'), email: 'staff2@example.com', password: 'password' },
      // Add more entries as needed
    ];

    // Insert books, students, and staff data into the respective collections
    const insertedBooks = await Book.insertMany(booksData);
    const insertedStudents = await Student.insertMany(studentsData);
    const insertedStaff = await Staff.insertMany(staffData);
    const insertedManagers = await Manager.insertMany(managersData);

    // Dummy data for Feedback model with manually inserted student ObjectId
    const feedbackData = [
      { student: insertedStudents[0].id, aspect: 'Availability of books', score: 4 },
      // Add more entries as needed
    ];

    // Dummy data for BorrowedBook model with manually inserted student and staff ObjectId
    const borrowedBooksData = [
      { student: insertedStudents[0].id, book: insertedBooks[0].id,staff: insertedStaff[0].id, issueDate: new Date(), dueDate: new Date() },
      { student: insertedStudents[1].id, book: insertedBooks[1].id,staff: insertedStaff[1].id,  issueDate: new Date(), dueDate: new Date() },
      // Add more entries as needed
    ];

    // Insert dummy data into the respective collections
    await Feedback.insertMany(feedbackData);
    await BorrowedBook.insertMany(borrowedBooksData);

    console.log('Dummy data inserted successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

initializeDatabase();