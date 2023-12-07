import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { staff_update_URL } from '../../constant';

const UpdateCredentials = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    const userDetail = localStorage.getItem('user_info');
    if (userDetail) {
      setUserInfo(JSON.parse(userDetail));
    }
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    gender: Yup.string().required('Required').oneOf(['Male', 'Female', 'Other']),
    location: Yup.string().required('Required').oneOf(['IT Services', 'Children Section', 'History Section']),
    performance: Yup.number().required('Required').min(1).max(5),
    salary: Yup.number().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    // password: Yup.string().min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      ...values,
      id: userInfo._id,
    };

    try {
      const response = await axios.post(staff_update_URL, payload);
      console.log('Credentials updated:', response.data);

      localStorage.setItem('user_info', JSON.stringify(response.data));

      window.location.reload();
    } catch (error) {
    //   console.error('Error updating credentials:', error.response?.data?.error || error.message);
    //   setUpdateError(error.response?.data?.error || 'Could not update credentials.');
    } finally {
    //   setSubmitting(false);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const formatSalary = (salary) => {
    if (salary && salary.$numberDecimal) {
      return Number(salary.$numberDecimal);
    }
    return salary || '';
  };

  const initialValues = {
    name: userInfo?.name || '',
    gender: userInfo?.gender || '',
    location: userInfo?.location || '',
    performance: userInfo?.performance || '',
    salary: formatSalary(userInfo?.salary),
    email: userInfo?.email || '',
    // password: userInfo?.password || ''
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
            <label htmlFor="location" className="form-label">
              Location:
            </label>
            <Field as="select" id="location" name="location" className="form-control">
              <option value="">Select Location</option>
              <option value="IT Services">IT Services</option>
              <option value="Children Section">Children Section</option>
              <option value="History Section">History Section</option>
            </Field>
            <ErrorMessage name="location" component="div" className="text-danger" />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="performance" className="form-label">
              Performance:
            </label>
            <Field type="number" id="performance" name="performance" className="form-control" />
            <ErrorMessage name="performance" component="div" className="text-danger" />
          </div> */}

          {/* <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary:
            </label>
            <Field type="number" id="salary" name="salary" className="form-control" />
            <ErrorMessage name="salary" component="div" className="text-danger" />
          </div> */}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <Field type="email" id="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password:
            </label>
            <Field type="password" id="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div> */}

          <Button type="submit" variant="primary">
            Update Credentials
          </Button>

          {updateError && (
            <div className="mt-3">
              <ErrorMessage name="updateError" component="div" className="text-danger" />
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateCredentials;
