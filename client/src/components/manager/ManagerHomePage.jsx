import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import ManagerInfo from './ManagerInfo';
import BorrowedBooks from '../studentfolder/BorrowedBooks';
import UpdateCredentials from './UpdateCredentials';
import RateStaff from './RateStaff';

const ManagerHomePage = () => {
  const [selectedSection, setSelectedSection] = useState('feedback');
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const userDetail = localStorage.getItem('user_info');
    if (userDetail) {
      setUserInfo(JSON.parse(userDetail));
    }
    console.log('userInfo in Student Home Page:', userInfo);
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Part - Manager Info */}
        <div className="col-md-3">
          <ManagerInfo userInfo={userInfo} />
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
                  active={selectedSection === 'RateStaff'}
                  onClick={() => setSelectedSection('RateStaff')}
                  className='mx-4'
                >
                  RateStaff
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
          {selectedSection === 'RateStaff' && <RateStaff userInfo={userInfo} />}
          {selectedSection === 'borrowedBooks' && <BorrowedBooks userInfo={userInfo}/>}
          {selectedSection === 'updateCredentials' && <UpdateCredentials />}
        </div>
      </div>
    </div>
  );
};

export default ManagerHomePage;
