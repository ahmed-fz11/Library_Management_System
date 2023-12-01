import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { book_all_URL, book_update_URL, borrowedbooks_add_URL } from '../../constant';

const StaffBooksList = ({ userInfo }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBooks = async () => {
    try {
      const response = await axios.post(book_all_URL); // Assuming GET request for fetching all books
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  useEffect(() => {
    

    fetchBooks();
  }, []);
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = searchTerm
    ? books.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : books;

  return (
    <div className="container mt-4">
      <h2>All Books in the Library</h2>
      <FormControl
        type="text"
        placeholder="Search by book title"
        className="mb-4"
        onChange={handleSearch}
      />
      <div className="row">
          {filteredBooks.map((book) => (
            <div key={book._id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{book.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                <Card.Text>Availability: {book.available ? 'Available' : 'Not Available'}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
        {filteredBooks.length === 0 && <p>No books found.</p>}
        </div>
      </div>
  );
};

export default StaffBooksList;
