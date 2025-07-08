const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Shopping', 'Health', 'Bills', 'Other'],
    default: 'Other'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model('Expense',expenseSchema);
module.exports = Expense;