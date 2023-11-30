import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, FormGroup, FormLabel, FormText } from "react-bootstrap";
import axios from "axios";
import { feedback_add_URL } from "../../constant";

const Feedback = ({ userInfo }) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Make API call to create feedback
      console.log("USERINFO: ",userInfo)
      const response = await axios.post(feedback_add_URL, {
        student: userInfo._id,
        aspect: values.aspect,
        score: values.score,
      });
      console.log("Feedback submission response:", response.data);
      setFeedbackMessage(
        `Feedback submitted successfully.`
      );
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setFeedbackMessage("Error submitting feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Provide Feedback</h2>
      <Formik initialValues={{ aspect: "", score: 1 }} onSubmit={handleSubmit}>
        <Form>
          <FormGroup controlId="aspect">
            <FormLabel>Aspect:</FormLabel>
            <Field as="select" name="aspect" className="form-control">
              <option value="" disabled>
                Select an Aspect
              </option>
              <option value="Availability of books">
                Availability of books
              </option>
              <option value="Diversity of collections">
                Diversity of collections
              </option>
              <option value="Cleanliness of library">
                Cleanliness of library
              </option>
            </Field>
          </FormGroup>

          <FormGroup controlId="score">
            <FormLabel>Score:</FormLabel>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="form-check form-check-inline">
                  <Field
                    type="radio"
                    name="score"
                    value={value}
                    className="form-check-input"
                    id={`score-${value}`}
                  />
                  <label
                    className="form-check-label mx-1"
                    htmlFor={`score-${value}`}
                  >
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </FormGroup>

          <Button type="submit" variant="primary">
            Submit Feedback
          </Button>
        </Form>
      </Formik>

      {feedbackMessage && (
        <div className="mt-3">
          <FormText>{feedbackMessage}</FormText>
        </div>
      )}
    </div>
  );
};

export default Feedback;
