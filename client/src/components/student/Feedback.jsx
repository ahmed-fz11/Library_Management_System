import React, { useState,useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Button, FormGroup, FormLabel, FormText } from "react-bootstrap";
import axios from "axios";
import { feedback_add_URL,feedback_update_URL,feedback_category_URL,feedback_all_URL } from "../../constant";
import MyFeedbacks from "./MyFeedbacks";

const Feedback = ({ userInfo }) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [existingFeedbacks, setExistingFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.post(feedback_category_URL, {
          student: userInfo?._id,
        });
        setExistingFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [userInfo]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let all_feedbacks = await axios.post(feedback_all_URL);
      all_feedbacks = all_feedbacks.data;
      console.log("all_feedbacks",all_feedbacks);
      // Check if the feedback for the given aspect already exists
      const existingFeedback = all_feedbacks.filter(
        (feedback) =>
          feedback?.aspect === values?.aspect &&
          feedback?.student?._id === userInfo?._id
      );
        console.log("existingFeedback",existingFeedback)
      if (existingFeedback.length > 0) {
        console.log("rhbgse")
        // Update existing feedback
        const response = await axios.post(feedback_update_URL, {
          id:existingFeedback._id,
          student: userInfo._id,
          aspect: values.aspect,
          score: values.score,
          update: true,
        });
        setFeedbackMessage(`Feedback updated successfully.`);
      } else {
        // Create new feedback
        const response = await axios.post(feedback_add_URL, {
          student: userInfo._id,
          aspect: values.aspect,
          score: values.score,
        });
        setFeedbackMessage(`Feedback submitted successfully.`);
      }
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
      <MyFeedbacks userInfo={userInfo}></MyFeedbacks>
    </div>
  );
};

export default Feedback;
