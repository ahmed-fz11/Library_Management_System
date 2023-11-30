import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { book_all_URL } from '../../constant';

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch list of books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.post(book_all_URL); //API endpoint
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div className="container mt-4">
      <h2>All Books in the Library</h2>
      <div className="row">
        {books.map((book) => (
          <div key={book._id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{book.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                <Card.Text>Availability: {book.available ? 'Available' : 'Not Available'}</Card.Text>
                {book.available && (
                  <Button variant="primary">Borrow</Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
