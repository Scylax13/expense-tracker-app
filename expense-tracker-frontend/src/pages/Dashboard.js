// src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const categoryIcons = {
  Food: '🍕',
  Travel: '🚗',
  Shopping: '🛒',
  Health: '💊',
  Bills: '💡',
  Other: '📦',
};

const statCards = [
  { label: "Today's Spend", icon: '💸' },
  { label: 'This Month', icon: '📅' },
  { label: 'Total Expenses', icon: '📊' },
];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ amount: '', category: '', description: '' });
  const [userName, setUserName] = useState('');
  const categories = ['Food', 'Travel', 'Shopping', 'Health', 'Bills', 'Other'];

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // Optionally fetch user name from backend or localStorage
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (formData._id) {
        await axios.put(`http://localhost:5000/api/expenses/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/expenses', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({ amount: '', category: '', description: '' });
      fetchExpenses();
    } catch (err) {
      console.error('Error:', err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (expense) => {
    setFormData({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      _id: expense._id,
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  // Stats
  const today = new Date().toISOString().slice(0, 10);
  const todayTotal = expenses
    .filter((exp) => exp.date?.slice(0, 10) === today)
    .reduce((sum, exp) => sum + Number(exp.amount), 0);
  const currentMonth = new Date().getMonth();
  const monthTotal = expenses
    .filter(exp => new Date(exp.date).getMonth() === currentMonth)
    .reduce((sum, exp) => sum + Number(exp.amount), 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  // Chart Data
  const expenseMap = expenses.reduce((acc, exp) => {
    const day = new Date(exp.date).toLocaleDateString();
    acc[day] = (acc[day] || 0) + Number(exp.amount);
    return acc;
  }, {});
  const labels = Object.keys(expenseMap).slice(-7);
  const values = labels.map(date => expenseMap[date]);
  const barChartData = {
    labels,
    datasets: [
      {
        label: '₹ Spent',
        data: values,
        backgroundColor: '#ffffff66',
        borderRadius: 6,
      }
    ]
  };

  return (
    <div className="dashboard-wrapper">
      {/* Navigation Bar */}
      <nav className="dashboard-navbar glass-nav">
        <div className="nav-brand">
          <h2 className="brand-title">TrackWise</h2>
        </div>
        <div className="nav-actions">
          <button className="btn btn-light fw-bold" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Welcome & Stats */}
      <section className="dashboard-hero">
        <h1 className="dashboard-title">
          Welcome back{userName ? `, ${userName}` : ''} <span role="img" aria-label="wave">👋</span>
        </h1>
        <div className="dashboard-stats">
          <div className="stat-card glass-card">
            <div className="stat-icon">💸</div>
            <div className="stat-info">
              <div className="stat-label">Today's Spend</div>
              <div className="stat-value">₹{todayTotal.toFixed(2)}</div>
            </div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <div className="stat-label">This Month</div>
              <div className="stat-value">₹{monthTotal.toFixed(2)}</div>
            </div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-label">Total Expenses</div>
              <div className="stat-value">₹{totalExpenses.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-columns">
          {/* Left Column: Add Expense & Chart */}
          <div className="left-column">
            <div className="glass-card mb-4">
              <h4 className="mb-3"><span role="img" aria-label="add">➕</span> Add New Expense</h4>
              <form onSubmit={handleAddExpense}>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount (₹)"
                  className="form-control mb-2"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
                <select
                  name="category"
                  className="form-select mb-2"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat, idx) => (
                    <option value={cat} key={idx}>{cat}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="form-control mb-3"
                  value={formData.description}
                  onChange={handleChange}
                />
                <button className="btn btn-primary w-100 fw-bold" type="submit">
                  {formData._id ? "Update Expense" : "Add Expense"}
                </button>
              </form>
            </div>
            <div className="glass-card mb-4">
              <h4 className="mb-3"><span role="img" aria-label="chart">📊</span> Weekly Spend</h4>
              <Bar data={barChartData} options={{
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
                responsive: true,
                maintainAspectRatio: false,
                height: 200
              }} />
            </div>
          </div>

          {/* Right Column: Recent Expenses */}
          <div className="right-column">
            <div className="glass-card mb-4">
              <h4 className="mb-3"><span role="img" aria-label="recent">🧾</span> Recent Expenses</h4>
              {expenses.length === 0 ? (
                <p>No expenses yet.</p>
              ) : (
                <ul className="expense-list">
                  {expenses.slice(-7).reverse().map((exp) => (
                    <li key={exp._id} className="expense-item">
                      <span className="expense-icon">{categoryIcons[exp.category] || '📦'}</span>
                      <div className="expense-details">
                        <div className="expense-title">{exp.description || 'No description'}</div>
                        <div className="expense-category">{exp.category}</div>
                        <div className="expense-date">{new Date(exp.date).toLocaleDateString()}</div>
                      </div>
                      <div className="expense-amount">₹{Number(exp.amount).toFixed(2)}</div>
                      <div className="expense-actions">
                        <button className="btn btn-sm btn-outline" onClick={() => handleEdit(exp)} title="Edit">✏️</button>
                        <button className="btn btn-sm btn-outline" onClick={() => handleDelete(exp._id)} title="Delete">🗑️</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
