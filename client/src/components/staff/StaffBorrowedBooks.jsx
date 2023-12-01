import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import {borrowedbooks_all_URL,borrowedbooks_update_URL} from '../../constant';

const StaffBorrowedBooks = ({ userInfo }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [currentlyBorrowedBooks, setCurrentlyBorrowedBooks] = useState([]);
//   const [previouslyBorrowedBooks, setPreviouslyBorrowedBooks] = useState([]);
  // Fetch borrowed books data for the current student from the backend
  const fetchBorrowedBooks = async () => {
    try {
      const user_id = userInfo._id;
      const response = await axios.post(borrowedbooks_all_URL);
      const filteredBooks = response.data;
      setBorrowedBooks(filteredBooks)
 
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
    }
  };

  useEffect(() => {
    

    fetchBorrowedBooks();
  }, [userInfo._id]);

  const markAsOverdue = async (borrowedBookId) => {
    try {
      await axios.post(borrowedbooks_update_URL, {
        id: borrowedBookId,
        status: 'overdue',
      });
      // Refresh the list to show the updated status
      fetchBorrowedBooks();
    } catch (error) {
      console.error('Error marking book as overdue:', error);
    }
  };

  return (
    <div>
      <h2>Record of Borrowed Books</h2>
      <div className="row">
        {borrowedBooks.map((borrowedBook) => {
          const isOverdue = new Date(borrowedBook.dueDate) < new Date();
          return (
            <div key={borrowedBook._id} className="col-md-4 mb-4">
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{borrowedBook.book.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{borrowedBook.book.author}</Card.Subtitle>
                  <Card.Text>
                    <strong>Issue Date:</strong> {new Date(borrowedBook.issueDate).toLocaleDateString()} <br />
                    <strong>Due Date:</strong> {new Date(borrowedBook.dueDate).toLocaleDateString()} <br />
                    <strong>Status:</strong> {borrowedBook.status}
                  </Card.Text>
                  {isOverdue && borrowedBook.status === 'issued' && (
                    <Button variant="warning" onClick={() => markAsOverdue(borrowedBook._id)}>
                      Mark Overdue
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StaffBorrowedBooks;
