
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { setToken } from '../../utils/authUtils';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const data = await login(email, password);
      setToken(data.token);
      navigate('/users');
    } catch (err) {
      setError(err.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to User Management</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eve.holt@reqres.in"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="cityslicka"
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-info">
          <p>Demo credentials:</p>
          <p>Email: eve.holt@reqres.in</p>
          <p>Password: cityslicka</p>
        </div>
      </div>
    </div>
  );
};

export default Login;