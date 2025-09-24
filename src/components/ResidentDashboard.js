import React, { useState } from 'react';

const ResidentDashboard = ({ onLogout }) => {
  const [complaints, setComplaints] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [complaintText, setComplaintText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  // Random ward for demo
  const userWard = Math.floor(Math.random() * 5) + 1;
  
  const wardData = {
    1: { rating: 4.2, email: 'ward1@bengaluru.gov.in' },
    2: { rating: 3.8, email: 'ward2@bengaluru.gov.in' },
    3: { rating: 4.5, email: 'ward3@bengaluru.gov.in' },
    4: { rating: 3.9, email: 'ward4@bengaluru.gov.in' },
    5: { rating: 4.1, email: 'ward5@bengaluru.gov.in' }
  };

  const wardInfo = wardData[userWard];

  const recyclingData = [
    { item: 'Paper', price: '₹5/kg', center: 'Green Recycling Center' },
    { item: 'Plastic', price: '₹12/kg', center: 'Eco Waste Hub' },
    { item: 'Glass', price: '₹3/kg', center: 'Glass Recovery Unit' },
    { item: 'Metal', price: '₹25/kg', center: 'Metal Recycling Co.' },
    { item: 'E-Waste', price: '₹15/kg', center: 'Tech Waste Solutions' }
  ];

  const submitComplaint = () => {
    if (complaintText.trim()) {
      setComplaints([...complaints, complaintText.trim()]);
      setComplaintText('');
      alert('Complaint submitted successfully!');
    }
  };

  const submitFeedback = () => {
    if (feedbackText.trim()) {
      setFeedbacks([...feedbacks, feedbackText.trim()]);
      setFeedbackText('');
      alert('Feedback submitted successfully!');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Resident Dashboard</h2>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Ward Information</h3>
          <p><strong>Ward Number:</strong> {userWard}</p>
          <p><strong>Rating:</strong> <span className="rating">{wardInfo.rating}/5.0</span></p>
          <p><strong>Ward Email:</strong> {wardInfo.email}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Submit Complaint</h3>
          <div className="complaint-form">
            <textarea
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              placeholder="Describe your complaint..."
            />
            <button 
              onClick={submitComplaint}
              className="submit-button complaint-submit"
            >
              Submit Complaint
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>Submit Feedback</h3>
          <div className="complaint-form">
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Share your feedback..."
            />
            <button 
              onClick={submitFeedback}
              className="submit-button feedback-submit"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
      
      <div className="recycling-section">
        <h3>♻️ Recycling Information</h3>
        <p>Current recycling rates and centers in your area:</p>
        <div className="recycling-items">
          {recyclingData.map((item, index) => (
            <div key={index} className="recycling-item">
              <h4>{item.item}</h4>
              <div className="recycling-price">{item.price}</div>
              <p>{item.center}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="dashboard-card">
        <h3>Recent Complaints & Feedbacks</h3>
        <div>
          <h4>Complaints:</h4>
          {complaints.length === 0 ? (
            <p>No complaints submitted yet.</p>
          ) : (
            complaints.map((complaint, index) => (
              <p key={index} style={{ marginBottom: '0.5rem' }}>
                <strong>Complaint {index + 1}:</strong> {complaint}
              </p>
            ))
          )}
        </div>
        <div style={{ marginTop: '1rem' }}>
          <h4>Feedbacks:</h4>
          {feedbacks.length === 0 ? (
            <p>No feedback submitted yet.</p>
          ) : (
            feedbacks.map((feedback, index) => (
              <p key={index} style={{ marginBottom: '0.5rem' }}>
                <strong>Feedback {index + 1}:</strong> {feedback}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;