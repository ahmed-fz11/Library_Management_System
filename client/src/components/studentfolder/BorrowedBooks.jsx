import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

const BorrowedBooks = ({ userInfo }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Fetch borrowed books data for the current student from the backend
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.post(`/api/borrowedbooks/student/${userInfo._id}`);
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, [userInfo._id]);

  return (
    <div>
      <h2>Borrowed Books</h2>
      {borrowedBooks.map((borrowedBook) => (
        <Card key={borrowedBook._id} className="mb-3">
          <Card.Body>
            <Card.Title>{borrowedBook.book.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{borrowedBook.book.author}</Card.Subtitle>
            <Card.Text>
              <strong>Issue Date:</strong> {new Date(borrowedBook.issueDate).toLocaleDateString()} <br />
              <strong>Due Date:</strong> {new Date(borrowedBook.dueDate).toLocaleDateString()} <br />
              <strong>Status:</strong> {borrowedBook.status}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      {borrowedBooks.length === 0 && <p>No books currently borrowed.</p>}
    </div>
  );
};

export default BorrowedBooks;
