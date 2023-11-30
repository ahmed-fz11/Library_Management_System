import React, { useState } from 'react';
import { MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import StudentSignUp from './signup/StudentSignUp';
import ManagerSignUp from './signup/ManagerSignUp';
import StaffSignUp from './signup/StaffSignUp';

const SignUp = () => {
  const [role, setRole] = useState('student');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create your account</h2>
          {signupError && <div className="alert alert-danger" role="alert">{signupError}</div>}
          <select className="form-select mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
          {role === 'student' && <StudentSignUp handleLoginRedirect={handleLoginRedirect} setSignupError={setSignupError} navigate={navigate} />}
          {role === 'manager' && <ManagerSignUp handleLoginRedirect={handleLoginRedirect} setSignupError={setSignupError} navigate={navigate} />}
          {role === 'staff' && <StaffSignUp handleLoginRedirect={handleLoginRedirect} setSignupError={setSignupError} navigate={navigate} />}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUp;
