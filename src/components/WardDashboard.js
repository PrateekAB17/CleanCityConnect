import React, { useState } from 'react';

const WardDashboard = ({ onLogout }) => {
  const [taskStatus, setTaskStatus] = useState({
    'worker-arrived': false,
    'garbage-collected': false,
    'garbage-left': true
  });

  const toggleTask = (taskId) => {
    setTaskStatus(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getTaskText = (taskId, isActive) => {
    switch(taskId) {
      case 'worker-arrived':
        return isActive ? 'Arrived' : 'Not Arrived';
      case 'garbage-collected':
        return isActive ? 'Collected' : 'Not Collected';
      case 'garbage-left':
        return isActive ? 'Yes' : 'No';
      default:
        return '';
    }
  };

  const tasks = [
    { id: 'worker-arrived', label: 'Worker Arrived' },
    { id: 'garbage-collected', label: 'Garbage Collected' },
    { id: 'garbage-left', label: 'Garbage Left' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Ward Member Dashboard</h2>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      
      <div className="assignable-points">
        <h3>Garbage Collection Status</h3>
        {tasks.map(task => (
          <div key={task.id} className="point-item">
            <span>{task.label}</span>
            <button
              className={`point-toggle ${taskStatus[task.id] ? 'active' : 'inactive'}`}
              onClick={() => toggleTask(task.id)}
            >
              {getTaskText(task.id, taskStatus[task.id])}
            </button>
          </div>
        ))}
      </div>
      
      <div className="dashboard-card">
        <h3>Collection Summary</h3>
        <p>Track the progress of garbage collection in your assigned area. Update the status as work progresses.</p>
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Current Status:</strong></p>
          <ul style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
            <li>Worker Status: {taskStatus['worker-arrived'] ? '✅ Arrived' : '❌ Not Arrived'}</li>
            <li>Collection Status: {taskStatus['garbage-collected'] ? '✅ Collected' : '❌ Not Collected'}</li>
            <li>Remaining Garbage: {taskStatus['garbage-left'] ? '⚠️ Yes' : '✅ None'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WardDashboard;