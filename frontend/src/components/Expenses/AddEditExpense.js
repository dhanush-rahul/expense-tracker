// pages/AddEditExpense.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const AddEditExpense = ({ existingExpense = false, onSubmitSuccess }) => {
  const [amount, setAmount] = useState(existingExpense?.amount || '');
  const [category, setCategory] = useState(existingExpense?.category || '');
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(() => {
    if (existingExpense?.date) {
      return existingExpense.date;
    } else {
      const today = new Date();
      return today.toISOString().split('T')[0]; // This formats the date as YYYY-MM-DD
    }
  });  const [description, setDescription] = useState(existingExpense?.description || '');
  const navigate = useNavigate();

 // Fetch categories from the API
 useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/getCategories');
      setCategories(response.data); // Assuming the API returns an array of categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  fetchCategories();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const data = { amount, category, date, description };

  try {
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
    
    // Notify parent component (Dashboard) of success
    toast.success("Expense added successfully");
    onSubmitSuccess(); // Call the success function
  } catch (error) {
    console.error('Error submitting expense:', error);
  }
};

  return (
    <div>
    <div class="flex justify-center items-center ">
    <div class="p-8 max-w-lg w-full">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        {existingExpense ? 'Edit' : 'Add'} Expense
      </h2>
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="amount">Amount</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" required />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" required>
          <option value="">Select a Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="date">Date</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"></textarea>
        </div>
        <button type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition-all">
          {existingExpense ? 'Edit' : 'Add'} Expense
        </button>
      </form>
    </div>
  </div>
  </div>
  );
};

export default AddEditExpense;
