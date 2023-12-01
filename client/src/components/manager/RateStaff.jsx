import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { staff_all_URL, staff_update_URL } from '../../constant';

const RateStaff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [updateMessage, setUpdateMessage] = useState('');
  const [performanceValues, setPerformanceValues] = useState({}); 

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await axios.post(staff_all_URL);
        setStaffMembers(response.data);
        
        const initialPerformanceValues = response.data.reduce((acc, staff) => {
          acc[staff._id] = staff.performance;
          return acc;
        }, {});
        setPerformanceValues(initialPerformanceValues);
      } catch (error) {
        console.error('Error fetching staff members:', error);
      }
    };
    fetchStaffMembers();
  }, []);

  const handlePerformanceChange = (staffId, value) => {
    setPerformanceValues({
      ...performanceValues,
      [staffId]: Number(value), // Store the new value as a number
    });
  };

  const handlePerformanceUpdate = async (staffId) => {
    const newPerformance = performanceValues[staffId];
    if (newPerformance >= 1 && newPerformance <= 5) {
      try {
        const response = await axios.post(staff_update_URL, {
          id: staffId,
          performance: newPerformance,
        });
        
        setStaffMembers(staffMembers.map(staff =>
          staff._id === staffId ? { ...staff, performance: newPerformance } : staff
        ));
        
        setUpdateMessage('Performance updated successfully!');
        
        setTimeout(() => {
          setUpdateMessage('');
        }, 3000);
      } catch (error) {
        console.error('Error updating performance:', error);
      }
    } else {
      alert('Performance must be between 1 and 5.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Rate Staff Performance</h2>
      {updateMessage && <Alert variant="success">{updateMessage}</Alert>}
      <div className="row">
        {staffMembers.map((staff) => (
          <div key={staff._id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{staff.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{staff.location}</Card.Subtitle>
                <Card.Text>
                  Gender: {staff.gender} <br />
                  Performance: {staff.performance} <br />
                  Salary: {staff.salary.$numberDecimal} <br />
                  Email: {staff.email}
                </Card.Text>
                <Form.Group controlId={`performanceUpdate-${staff._id}`}>
                  <Form.Control
                    type="number"
                    placeholder="Enter new performance rating"
                    min="1"
                    max="5"
                    value={performanceValues[staff._id]}
                    onChange={(e) => handlePerformanceChange(staff._id, e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() => handlePerformanceUpdate(staff._id) }
                  style={{ marginTop: '1em' }}
                >
                  Update Performance
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RateStaff;
