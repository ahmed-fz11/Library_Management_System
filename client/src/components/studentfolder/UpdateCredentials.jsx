import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { student_update_URL } from '../../constant';

const UpdateCredentials = ({ userInfo }) => {
  const initialValues = {
    name: userInfo.name,
    phoneNo: userInfo.phoneNo,
    gender: userInfo.gender,
    email: userInfo.email,
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    phoneNo: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Make API call to update student credentials
      const response = await axios.post(student_update_URL, { id: userInfo.id, ...values });
      console.log('Credentials updated:', response.data);
    } catch (error) {
      console.error('Error updating credentials:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Update Credentials</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <Field type="text" id="name" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNo" className="form-label">
              Phone Number:
            </label>
            <Field type="text" id="phoneNo" name="phoneNo" className="form-control" />
            <ErrorMessage name="phoneNo" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <Field as="select" id="gender" name="gender" className="form-control">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage name="gender" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <Field type="email" id="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password:
            </label>
            <Field type="password" id="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>

          <Button type="submit" variant="primary">
            Update Credentials
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateCredentials;
