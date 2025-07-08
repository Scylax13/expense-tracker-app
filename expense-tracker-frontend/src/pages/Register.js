// src/pages/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Using same CSS for consistency

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage({ type: 'success', text: 'Registration successful! Please log in.' });
      setFormData({ name: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Registration failed. Please try again.' 
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
            <h3>Start Your Financial Journey</h3>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div>
                <h4>Set Goals</h4>
                <p>Create budgets and track your progress towards financial goals</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <div>
                <h4>Track Progress</h4>
                <p>Monitor your spending habits and identify areas to save</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <div>
                <h4>Secure & Private</h4>
                <p>Your financial data is encrypted and secure with us</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="login-form-container">
          <div className="login-card">
            <div className="form-header">
              <h2>Create Account 🚀</h2>
              <p>Join thousands of users managing their expenses smartly</p>
            </div>

            {message && (
              <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  className="form-control" 
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  className="form-control" 
                  placeholder="Enter your email address"
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
                  className="form-control" 
                  placeholder="Create a strong password"
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="form-footer">
              <p>Already have an account? <Link to="/login" className="link">Sign in here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;