import React, { useState } from 'react';
import StudentInfo from './StudentInfo';
import StudentNavbar from './StudentNavbar';
import Feedback from './Feedback';
import BooksList from './BooksList';
import BorrowedBooks from './BorrowedBooks';
import UpdateCredentials from './UpdateCredentials';

const StudentHomePage = ({ userInfo }) => {
  const [selectedSection, setSelectedSection] = useState('feedback');

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case 'feedback':
        return <Feedback />;
      case 'booksList':
        return <BooksList />;
      case 'borrowedBooks':
        return <BorrowedBooks />;
      case 'updateCredentials':
        return <UpdateCredentials userInfo={userInfo} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Part - Student Info */}
        <div className="col-md-3">
          <StudentInfo userInfo={userInfo} />
        </div>

        {/* Right Part - Navbar and Respective Section */}
        <div className="col-md-9">
          {/* Navbar */}
          <StudentNavbar onSelectSection={(section) => setSelectedSection(section)} />

          {/* Respective Section */}
          {renderSelectedSection()}
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
