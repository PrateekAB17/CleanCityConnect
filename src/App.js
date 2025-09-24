import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import GovtDashboard from './components/GovtDashboard';
import WardDashboard from './components/WardDashboard';
import ResidentDashboard from './components/ResidentDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userType) => {
    setCurrentUser(userType);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>CleanCityConnect</h1>
          <p>Waste Management System Bengaluru</p>
        </header>

        <Routes>
          <Route 
            path="/" 
            element={
              currentUser ? (
                <Navigate to={`/${currentUser}-dashboard`} />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/govt-dashboard" 
            element={
              currentUser === 'govt' ? (
                <GovtDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/ward-dashboard" 
            element={
              currentUser === 'ward' ? (
                <WardDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/resident-dashboard" 
            element={
              currentUser === 'resident' ? (
                <ResidentDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;