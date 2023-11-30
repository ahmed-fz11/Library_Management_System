import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../styles/login.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import { manager_login_URL, staff_login_URL, student_login_URL } from '../constant.js';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [role, setRole] = useState('student'); 
  const [loginError, setLoginError] = useState(''); 
  const navigate = useNavigate();
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required')
  });

  // Initial values for Formik
  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = (values) => {
    let url;
    let user_type;;
    switch (role) {
      case 'student':
        url = student_login_URL;
        user_type = 'student';
        break;
      case 'manager':
        url = manager_login_URL;
        user_type = 'manager';
        break;
      case 'staff':
        url = staff_login_URL;
        user_type = 'staff';
        break;
      default:
        url = student_login_URL; // default case
    }

    axios.post(url, {
      email: values.email,
      password: values.password
    })
    .then(response => {
      localStorage.setItem('user_info', JSON.stringify(response.data));
      localStorage.setItem('user_type', JSON.stringify(user_type));
      console.log("Login successful")
      console.log(response.data)
      navigate('/home');
    })
    .catch(error => {
      setLoginError(error.response?.data?.error || 'Login failed');
    });
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Login to your account</h2>
          
          {loginError && <div className="alert alert-danger" role="alert">{loginError}</div>}

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <select className="form-select mb-4" value={role} onChange={handleRoleChange} aria-label="Default select example">
                  <option value="student">Student</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>

                <Field className='form-control mb-4' name='email' type='email' placeholder='Your Email'/>
                <ErrorMessage name="email" component="div" className="text-danger" />

                <Field className='form-control mb-4' name='password' type='password' placeholder='Password'/>
                <ErrorMessage name="password" component="div" className="text-danger" />

                <MDBBtn type='submit' className='mb-4 w-100 gradient-custom-4' size='lg'>Login</MDBBtn>
              </Form>
            )}
          </Formik>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
