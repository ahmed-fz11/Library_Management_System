import React, { useEffect, useState } from 'react';
import StudentInfo from './StudentInfo';
import Feedback from './Feedback';
import BooksList from './BooksList';
import BorrowedBooks from './BorrowedBooks';
import UpdateCredentials from './UpdateCredentials';
import { Navbar, Nav } from 'react-bootstrap';

const StudentHomePage = ({ userInfo }) => {
  const [selectedSection, setSelectedSection] = useState('feedback');
  useEffect(() => {
    console.log('userInfo in Student Home Page:', userInfo);
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Part - Student Info */}
        <div className="col-md-3">
          <StudentInfo userInfo={userInfo} />
        </div>

        {/* Right Part - Navbar and Respective Section */}
        <div className="col-md-9">
          {/* Bootstrap Navbar */}
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="w-100 justify-content-between">
                <Nav.Link
                  href="#"
                  active={selectedSection === 'updateCredentials'}
                  onClick={() => setSelectedSection('updateCredentials')}
                  className='mx-4'
                >
                  Credentials
                </Nav.Link>
                <Nav.Link
                  href="#"
                  active={selectedSection === 'books'}
                  onClick={() => setSelectedSection('books')}
                  className='mx-4'
                >
                  Books
                </Nav.Link>
                <Nav.Link
                  href="#"
                  active={selectedSection === 'feedback'}
                  onClick={() => setSelectedSection('feedback')}
                  className='mx-4'
                >
                  Feedback
                </Nav.Link>
                <Nav.Link
                  href="#"
                  active={selectedSection === 'borrowedBooks'}
                  onClick={() => setSelectedSection('borrowedBooks')}
                  className='mx-4'
                >
                  Borrowed Books
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* Respective Section */}
          {selectedSection === 'feedback' && <Feedback />}
          {selectedSection === 'books' && <BooksList />}
          {selectedSection === 'borrowedBooks' && <BorrowedBooks />}
          {selectedSection === 'updateCredentials' && <UpdateCredentials />}
          {/* <UpdateCredentials userInfo={userInfo} /> */}
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
