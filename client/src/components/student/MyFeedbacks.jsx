import React, { useState, useEffect } from 'react';
import { Button, FormText } from 'react-bootstrap';
import axios from 'axios';
import { feedback_all_URL, feedback_delete_URL } from '../../constant';

const MyFeedbacks = ({ userInfo }) => {
    console.log("USERINFO: ",userInfo)
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    // if (!userInfo || !userInfo.id) {
    //   // If userInfo is null or id is not present, return or handle accordingly
    //   return;
    // }

    // Fetch all feedbacks for the current signed-in student
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.post(feedback_all_URL);
        console.log("all FEEDBACKS: ",response.data)
        const studentFeedbacks = response.data.filter((feedback) => feedback.student?.id === userInfo.id);
        console.log('Filtered feedbacks:', studentFeedbacks);
        setFeedbacks(studentFeedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, [userInfo]);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      // Make API call to delete feedback
      await axios.delete(feedback_delete_URL, { data: { id: feedbackId } });
      setFeedbackMessage('Feedback deleted successfully.');
      // Refresh feedbacks after deletion
      const response = await axios.post(feedback_all_URL);
      const studentFeedbacks = response.data.filter((feedback) => feedback.student?.id === userInfo.id);
      setFeedbacks(studentFeedbacks);
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setFeedbackMessage('Error deleting feedback. Please try again.');
    }
  };

  return (
    <div>
      <h2 className='mt-4 p-1'>My Feedbacks</h2>
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className='mt-4'>
              {feedback.aspect} - Score: {feedback.score}
              <Button
                variant="danger"
                className="ml-2 mx-4"
                onClick={() => handleDeleteFeedback(feedback._id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedbacks available.</p>
      )}

      {feedbackMessage && (
        <div className="mt-3">
          <FormText>{feedbackMessage}</FormText>
        </div>
      )}
    </div>
  );
};

export default MyFeedbacks;
