import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { feedback_all_URL } from '../../constant';  

const ManagerFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedAspect, setSelectedAspect] = useState('');
  const [uniqueAspects, setUniqueAspects] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.post(feedback_all_URL);
        setFeedbacks(response.data);
        setUniqueAspects(Array.from(new Set(response.data.map((feedback) => feedback?.aspect))));
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Function to calculate the average feedback for a selected aspect
  const calculateAverage = () => {
    const aspectFeedbacks = feedbacks.filter((feedback) => feedback?.aspect === selectedAspect);
    if (aspectFeedbacks.length === 0) {
      return 0;  // Default to 0 if there are no feedbacks for the selected aspect
    }
    const totalScore = aspectFeedbacks.reduce((sum, feedback) => sum + feedback?.score, 0);
    return totalScore / aspectFeedbacks.length;
  };

  return (
    <div>
      <h2 className='mt-3'>Categorical Feedback</h2>

      {/* Dropdown to select aspect */}
      <label htmlFor="aspect" className='mt-4'></label>
      <select id="aspect" onChange={(e) => setSelectedAspect(e.target.value)}>
        <option value="">Select an Aspect</option>
        {uniqueAspects.map((aspect) => (
          <option key={aspect} value={aspect}>
            {aspect}
          </option>
        ))}
      </select>

      {selectedAspect && (
        <div>
          <h3 className='mt-3'>Aspect: {selectedAspect}</h3>

          {/* List of cards for feedbacks of the selected aspect */}
          <div className="card-list">
            {feedbacks
              .filter((feedback) => feedback?.aspect === selectedAspect)
              .map((feedback) => (
                <div key={feedback?.id} className="card p-4 mb-3 mt-3">
                  <p>
                    <strong>Student Name:</strong> {feedback?.student?.name}
                  </p>
                  <p>
                    <strong>Aspect:</strong> {feedback?.aspect}
                  </p>
                  <p>
                    <strong>Score:</strong> {feedback?.score}
                  </p>
                </div>
              ))}
          </div>

          <p>
            <strong className='mt-3'>Average Feedback:</strong> {calculateAverage()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ManagerFeedbacks;
