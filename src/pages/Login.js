import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to users list if token exists
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/users');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email !== 'eve.holt@reqres.in' || password !== 'cityslicka') {
      setError('Invalid credentials. Please use the correct email and password.');
      return;
    }
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/users');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h1><i className="fas fa-sign-in-alt"></i> Login</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label><i className="fas fa-envelope"></i> Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label><i className="fas fa-lock"></i> Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit"><i className="fas fa-sign-in-alt"></i> Login</button>
      </form>
    </div>
  );
};

export default Login;
