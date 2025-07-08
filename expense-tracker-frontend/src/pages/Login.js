// src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Login failed. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-content">
        {/* Left Side - App Info */}
        <div className="login-info">
          <div className="app-brand">
            <h1 className="app-title">TrackWise</h1>
            <p className="app-tagline">Smart Expense Tracking Made Simple</p>
          </div>
          
          <div className="features-list">
            <h3>Why Choose TrackWise?</h3>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <div>
                <h4>Visual Analytics</h4>
                <p>Beautiful charts to understand your spending patterns</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <div>
                <h4>Smart Categorization</h4>
                <p>Organize expenses by categories for better insights</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <div>
                <h4>Easy to Use</h4>
                <p>Simple interface to track expenses on the go</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-card">
            <div className="form-header">
              <h2>Welcome Back 👋</h2>
              <p>Sign in to continue tracking your expenses</p>
            </div>

            {message && (
              <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="form-footer">
              <p>Don't have an account? <Link to="/register" className="link">Sign up here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
