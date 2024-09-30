// pages/AddEditExpense.js
import React, { useState, useRef } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const AddEditExpense = ({ existingExpense }) => {
  const [amount, setAmount] = useState(existingExpense?.amount || '');
  const [category, setCategory] = useState(existingExpense?.category || '');
  const [date, setDate] = useState(existingExpense?.date || '');
  const [description, setDescription] = useState(existingExpense?.description || '');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = { amount, category, date, description };
    if (existingExpense) {
      // Edit expense
      await axiosInstance.put(`/expenses/${existingExpense.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      // Add new expense
      await axiosInstance.post('/expenses', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">{existingExpense ? 'Edit' : 'Add'} Expense</button>
    </form>
  );
};

export default AddEditExpense;
