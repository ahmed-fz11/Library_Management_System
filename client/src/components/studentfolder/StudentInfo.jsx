import React from 'react';

const StudentInfo = ({ userInfo }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Student Information</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Name: </strong> {userInfo?.name}
          </li>
          <li className="list-group-item">
            <strong>Phone Number: </strong> {userInfo?.phoneNo}
          </li>
          <li className="list-group-item">
            <strong>Gender: </strong> {userInfo?.gender}
          </li>
          <li className="list-group-item">
            <strong>Email: </strong> {userInfo?.email}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentInfo;
