import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';
import axios from 'axios';
import { book_add_URL } from '../../constant';

const CreateBook = () => {
  const initialValues = {
    name: '',
    author: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Book name is required'),
    author: Yup.string().required('Author name is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Make API call to add the book to the database
      const response = await axios.post(book_add_URL, values);
      console.log('Book created:', response.data);
      
      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error('Error creating book:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className='mt-2'>Create a Book</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormGroup controlId="name">
              <FormLabel className='mt-3'>Book Name:</FormLabel>
              <Field
                type="text"
                name="name"
                as={FormControl}
                placeholder="Enter book name"
                isInvalid={(touched, error) => touched && error}
              />
              <ErrorMessage name="name" component={FormText} className="text-danger" />
            </FormGroup>

            <FormGroup controlId="author">
              <FormLabel className='mt-3'>Author:</FormLabel>
              <Field
                type="text"
                name="author"
                as={FormControl}
                placeholder="Enter author name"
                isInvalid={(touched, error) => touched && error}
              />
              <ErrorMessage name="author" component={FormText} className="text-danger" />
            </FormGroup>

            <Button type="submit" variant="primary" className='mt-3' disabled={isSubmitting}>
              Create Book
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBook;
