import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MDBBtn } from 'mdb-react-ui-kit';
import { staff_signup_URL } from '../../constant.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StaffSignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  gender: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender').required('Gender is required'),
  location: Yup.string().oneOf(['IT Services', 'Children Section', 'History Section'], 'Invalid location').required('Location is required'),
  performance: Yup.number().min(1).max(5).required('Performance is required'),
  salary: Yup.number().typeError('Salary must be a number').required('Salary is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const initialValues = {
  name: '',
  gender: '',
  location: '',
  performance: '',
  salary: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const StaffSignUp = () => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = React.useState('');

  const handleSubmit = (values, { setSubmitting }) => {
    // Remove the confirmPassword field as it's not needed for the backend
    const { confirmPassword, ...data } = values;

    axios.post(staff_signup_URL, data)
      .then(response => {
        navigate('/login');
      })
      .catch(error => {
        setSignupError(error.response?.data?.error || 'Signup failed');
        setSubmitting(false);
      });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={StaffSignUpSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field className='form-control mb-4' name='name' type='text' placeholder='Name'/>
          <ErrorMessage name="name" component="div" className="text-danger" />

          <Field as="select" name="gender" className="form-select mb-4">
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Field>
          <ErrorMessage name="gender" component="div" className="text-danger" />

          <Field as="select" name="location" className="form-select mb-4">
            <option value="">Location</option>
            <option value="IT Services">IT Services</option>
            <option value="Children Section">Children Section</option>
            <option value="History Section">History Section</option>
          </Field>
          <ErrorMessage name="location" component="div" className="text-danger" />

          <Field className='form-control mb-4' name='performance' type='number' placeholder='Performance (1-5)'/>
          <ErrorMessage name="performance" component="div" className="text-danger" />

          <Field className='form-control mb-4' name='salary' type='number' placeholder='Salary'/>
          <ErrorMessage name="salary" component="div" className="text-danger" />

          <Field className='form-control mb-4' name='email' type='email' placeholder='Email'/>
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

export default StaffSignUp;
