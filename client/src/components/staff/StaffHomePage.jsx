import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import StaffInfo from './StaffInfo';
import StaffBooksList from './StaffBooksList';
import Feedbacks from './Feedbacks';
import UpdateCredentials from './UpdateCredentials';
import StaffBorrowedBooks from './StaffBorrowedBooks';
import CreateBook from './CreateBook';

const StaffHomePage = ({ userInfo }) => {
  const [selectedSection, setSelectedSection] = useState('books');
  useEffect(() => {
    // console.log('userInfo in Staff Home Page:', userInfo);
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Part - Staff Info */}
        <div className="col-md-3">
          <StaffInfo userInfo={userInfo} />
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
                  active={selectedSection === 'feedbacks'}
                  onClick={() => setSelectedSection('feedbacks')}
                  className='mx-4'
                >
                  Feedbacks
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
                  active={selectedSection === 'BorrowedBooks'}
                  onClick={() => setSelectedSection('BorrowedBooks')}
                  className='mx-4'
                >
                  BorrowedBooks
                </Nav.Link>
                <Nav.Link
                  href="#"
                  active={selectedSection === 'CreateBook'}
                  onClick={() => setSelectedSection('CreateBook')}
                  className='mx-4'
                >
                 CreateBook
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* Respective Section */}
          {selectedSection === 'feedbacks' && <Feedbacks userInfo={userInfo} />}
          {selectedSection === 'books' && <StaffBooksList userInfo={userInfo} />}
          {selectedSection === 'updateCredentials' && <UpdateCredentials />}
          {selectedSection === 'BorrowedBooks' && <StaffBorrowedBooks userInfo={userInfo}/>}
          {selectedSection === 'CreateBook' && <CreateBook />}
        </div>
      </div>
    </div>
  );
};

export default StaffHomePage;
