import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const loginTypes = [
    {
      type: 'govt',
      icon: '🏛️',
      title: 'Government',
      description: 'Access ward ratings and management'
    },
    {
      type: 'ward',
      icon: '👷',
      title: 'Ward Member',
      description: 'Track garbage collection progress'
    },
    {
      type: 'resident',
      icon: '🏠',
      title: 'Resident',
      description: 'View ward details and submit complaints'
    }
  ];

  const handleCardClick = (type) => {
    setSelectedType(type);
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      onLogin(selectedType);
    } else {
      alert('Please enter valid credentials');
    }
  };

  const handleBack = () => {
    setSelectedType(null);
    setCredentials({ username: '', password: '' });
  };

  return (
    <main className="login-container">
      {!selectedType ? (
        <div className="login-types">
          <h2>Select Login Type</h2>
          <div className="login-cards">
            {loginTypes.map((loginType) => (
              <div
                key={loginType.type}
                className="login-card"
                onClick={() => handleCardClick(loginType.type)}
              >
                <div className="card-icon">{loginType.icon}</div>
                <h3>{loginType.title}</h3>
                <p>{loginType.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="login-form">
          <h2>
            {loginTypes.find(type => type.type === selectedType)?.title} Login
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="submit-btn">Login</button>
            <button type="button" className="back-btn" onClick={handleBack}>
              Back
            </button>
          </form>
        </div>
      )}
    </main>
  );
};

export default LoginPage;