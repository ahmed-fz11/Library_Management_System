import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MDBBtn } from 'mdb-react-ui-kit';
import { student_signup_URL } from '../../constant.js';
import axios from 'axios';

// Validation schema for student sign up
const StudentSignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNo: Yup.string().required('Phone number is required'),
  gender: Yup.string().required('Gender is required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

// Initial values for student sign up form
const initialValues = {
  name: '',
  gender: '',
  phoneNo: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const StudentSignUp = ({ handleLoginRedirect, setSignupError, navigate }) => {
  const handleSubmit = (values, { setSubmitting }) => {
    // console.log("values", values)
    
    const { confirmPassword, ...valuesToSend } = values;
    // console.log("valuesToSend", valuesToSend);

    axios.post(student_signup_URL, valuesToSend)
      .then(response => {
        navigate('/login');
      })
      .catch(error => {
        setSignupError(error.response?.data?.error || 'Signup failed');
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={StudentSignUpSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Field className='form-control mb-4' name='name' type='text' placeholder='Your Name'/>
          <ErrorMessage name="name" component="div" className="text-danger" />
          
          <Field className='form-control mb-4' name='phoneNo' type='text' placeholder='Phone Number'/>
          <ErrorMessage name="phoneNo" component="div" className="text-danger" />
          
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
          
          <MDBBtn type='submit' className='mb-4 w-100 gradient-custom-4' size='lg'>Sign Up</MDBBtn>
          <p className="text-center">
            Already have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={handleLoginRedirect}>Login</span>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default StudentSignUp;
