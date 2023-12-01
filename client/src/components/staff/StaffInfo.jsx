import React from 'react';

const StaffInfo = ({ userInfo }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Staff Information</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Name: </strong> {userInfo?.name}
          </li>
          <li className="list-group-item">
            <strong>Gender: </strong> {userInfo?.gender}
          </li>
          <li className="list-group-item">
            <strong>Email: </strong> {userInfo?.email}
          </li>
          <li className="list-group-item">
            <strong>Location: </strong> {userInfo?.location}
          </li>
          <li className="list-group-item">
            <strong>Performance: </strong> {userInfo?.performance}
          </li>
          <li className="list-group-item">
            <strong>Salary: </strong> {userInfo?.salary}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StaffInfo;