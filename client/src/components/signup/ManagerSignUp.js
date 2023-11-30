import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MDBBtn } from 'mdb-react-ui-kit';
import { manager_signup_URL } from '../../constant.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Validation schema for manager sign up
const ManagerSignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  gender: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender').required('Gender is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

// Initial values for manager sign up form
const initialValues = {
  name: '',
  gender: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const ManagerSignUp = () => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = React.useState('');

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post(manager_signup_URL, {
      name: values.name,
      gender: values.gender,
      email: values.email,
      password: values.password, // Assuming backend handles password hashing
    })
    .then(response => {
      navigate('/login'); // Redirect to login page after successful signup
    })
    .catch(error => {
      setSignupError(error.response?.data?.error || 'Signup failed');
      setSubmitting(false);
    });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ManagerSignUpSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field className='form-control mb-4' name='name' type='text' placeholder='Your Name'/>
          <ErrorMessage name="name" component="div" className="text-danger" />

          <Field as="select" name="gender" className="form-select mb-4">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Field>
          <ErrorMessage name="gender" component="div" className="text-danger" />

          <Field className='form-control mb-4' name='email' type='email' placeholder='Your Email'/>
          <ErrorMessage name="email" component="div" className="text-danger" />

          <Field className='form-control mb-4' name='password' type='password' placeholder='Password'/>
          <ErrorMessage name="password" component="div" className="text-danger" />

          <Field className='form-control mb-4' name='confirmPassword' type='password' placeholder='Confirm Password'/>
          <ErrorMessage name="confirmPassword" component="div" className="text-danger" />

          {signupError && <div className="alert alert-danger" role="alert">{signupError}</div>}

          <MDBBtn type='submit' disabled={isSubmitting} className='mb-4 w-100 gradient-custom-4' size='lg'>Sign Up</MDBBtn>

          <p className="text-center">
            Already have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={handleLoginRedirect}>Login</span>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default ManagerSignUp;
