import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import { manager_signup_URL, staff_signup_URL, student_signup_URL } from '../constant.js';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [role, setRole] = useState('student');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    gender: role !== 'student' ? Yup.string().required('Gender is required') : null,
    phoneNo: role === 'student' ? Yup.string().required('Phone number is required') : null,
    location: role === 'staff' ? Yup.string().required('Location is required') : null,
    performance: role === 'staff' ? Yup.number().min(1).max(5).required('Performance is required') : null,
    salary: role === 'staff' ? Yup.number().required('Salary is required') : null,
  });

  // Initial values for Formik
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phoneNo: '',
    location: '',
    performance: '',
    salary: '',
  };

  const handleSubmit = (values) => {
    let url;
    switch (role) {
      case 'student':
        url = student_signup_URL;
        break;
      case 'manager':
        url = manager_signup_URL;
        break;
      case 'staff':
        url = staff_signup_URL;
        break;
      default:
        url = student_signup_URL;
    }

    axios.post(url, values)
      .then(response => {
        console.log("Signup successful");
        console.log(response.data);
        navigate('/login');
      })
      .catch(error => {
        setSignupError(error.response?.data?.error || 'Signup failed');
      });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  }

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create your account</h2>
          {signupError && <div className="alert alert-danger" role="alert">{signupError}</div>}
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <select className="form-select mb-4" value={role} onChange={handleRoleChange}>
                  <option value="student">Student</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>

                <Field className='form-control mb-4' name='name' type='text' placeholder='Your Name'/>
                <ErrorMessage name="name" component="div" className="text-danger" />

                <Field className='form-control mb-4' name='email' type='email' placeholder='Your Email'/>
                <ErrorMessage name="email" component="div" className="text-danger" />

                <Field className='form-control mb-4' name='password' type='password' placeholder='Password'/>
                <ErrorMessage name="password" component="div" className="text-danger" />

                <Field className='form-control mb-4' name='confirmPassword' type='password' placeholder='Confirm Password'/>
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />

                {role !== 'student' && (
                  <>
                    <Field as="select" name="gender" className="form-select mb-4">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-danger" />
                  </>
                )}

                {role === 'student' && (
                  <>
                    <Field className='form-control mb-4' name='phoneNo' type='text' placeholder='Phone Number'/>
                    <ErrorMessage name="phoneNo" component="div" className="text-danger" />
                  </>
                )}

                {role === 'staff' && (
                  <>
                    <Field as="select" name="location" className="form-select mb-4">
                      <option value="">Select Location</option>
                      <option value="IT Services">IT Services</option>
                      <option value="Children Section">Children Section</option>
                      <option value="History Section">History Section</option>
                    </Field>
                    <ErrorMessage name="location" component="div" className="text-danger" />

                    <Field className='form-control mb-4' name='performance' type='number' placeholder='Performance (1-5)'/>
                    <ErrorMessage name="performance" component="div" className="text-danger" />

                    <Field className='form-control mb-4' name='salary' type='number' placeholder='Salary'/>
                    <ErrorMessage name="salary" component="div" className="text-danger" />
                  </>
                )}

                <MDBBtn type='submit' className='mb-4 w-100 gradient-custom-4' size='lg'>Sign Up</MDBBtn>
                <p className="text-center">
                  Already have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={handleLoginRedirect}>Login</span>
                </p>
              </Form>
            )}
          </Formik>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
