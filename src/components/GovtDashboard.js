import React from 'react';

const GovtDashboard = ({ onLogout }) => {
  const wardData = {
    1: { rating: 4.2, email: 'ward1@bengaluru.gov.in' },
    2: { rating: 3.8, email: 'ward2@bengaluru.gov.in' },
    3: { rating: 4.5, email: 'ward3@bengaluru.gov.in' },
    4: { rating: 3.9, email: 'ward4@bengaluru.gov.in' },
    5: { rating: 4.1, email: 'ward5@bengaluru.gov.in' }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Government Dashboard</h2>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      
      <div className="dashboard-grid">
        {Object.entries(wardData).map(([wardNo, data]) => (
          <div key={wardNo} className="dashboard-card">
            <h3>Ward {wardNo}</h3>
            <div className="rating">{data.rating}/5.0</div>
            <p>Rating based on cleanliness and service quality</p>
            <p><strong>Contact:</strong> {data.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovtDashboard;