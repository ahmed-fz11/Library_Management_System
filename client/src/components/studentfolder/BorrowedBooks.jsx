import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import {borrowedbooks_all_URL,borrowedbooks_update_URL,book_update_URL} from '../../constant';

const BorrowedBooks = ({ userInfo }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [currentlyBorrowedBooks, setCurrentlyBorrowedBooks] = useState([]);
  const [previouslyBorrowedBooks, setPreviouslyBorrowedBooks] = useState([]);
  // Fetch borrowed books data for the current student from the backend
  const fetchBorrowedBooks = async () => {
    try {
      const user_id = userInfo._id;
      const response = await axios.post(borrowedbooks_all_URL);
      const filteredBooks = response.data.filter(borrowedBook => borrowedBook.student._id === user_id);

      // Separate the borrowed books into currently and previously borrowed
      const currentBooks = filteredBooks.filter(book => book.status === 'issued' || book.status === 'overdue');
      const previousBooks = filteredBooks.filter(book => book.status !== 'issued' && book.status !== 'overdue');

      setCurrentlyBorrowedBooks(currentBooks);
      setPreviouslyBorrowedBooks(previousBooks); 
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
    }
  };
  useEffect(() => {
    

    fetchBorrowedBooks();
  }, [userInfo._id]);

   // Function to handle book return
   const handleReturnBook = async (borrowedBookId, bookId) => {
    try {
      // Update the borrowed book status to 'returned'
      await axios.post(borrowedbooks_update_URL, {
        id: borrowedBookId,
        status: 'returned',
      });

      // Update the book's availability to 'true'
      await axios.post(book_update_URL, {
        id: bookId,
        available: true,
      });

      fetchBorrowedBooks();

    } catch (error) {
      console.error('Error returning the book:', error);
    }
  };

  return (
    <div>
      <h2>Currently Borrowed Books</h2>
      {currentlyBorrowedBooks.map((borrowedBook) => (
        <Card key={borrowedBook._id} className="mb-3">
          <Card.Body>
            <Card.Title>{borrowedBook.book.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{borrowedBook.book.author}</Card.Subtitle>
            <Card.Text>
              <strong>Issue Date:</strong> {new Date(borrowedBook.issueDate).toLocaleDateString()} <br />
              <strong>Due Date:</strong> {new Date(borrowedBook.dueDate).toLocaleDateString()} <br />
              <strong>Status:</strong> {borrowedBook.status}
            </Card.Text>
            <Button 
              variant="primary" 
              onClick={() => handleReturnBook(borrowedBook._id, borrowedBook.book._id)}
            >
              Return Book
            </Button>
          </Card.Body>
        </Card>
      ))}
      {currentlyBorrowedBooks.length === 0 && <p>No books currently borrowed.</p>}
      <h2>Returned Borrowed Books</h2>
      {previouslyBorrowedBooks.map((borrowedBook) => (
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
      {previouslyBorrowedBooks.length === 0 && <p>No returned books.</p>}
    </div>
  );
};

export default BorrowedBooks;
