import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setExpenses(response.data);
    };
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-200 to-gray-300 text-black">
      <div className="w-full max-w-3xl mx-10 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Your Expenses</h2>

        {expenses && expenses.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-gray-100 p-4 border-b border-gray-300 text-left">Amount</th>
                <th className="bg-gray-100 p-4 border-b border-gray-300 text-left">Category</th>
                <th className="bg-gray-100 p-4 border-b border-gray-300 text-left">Date</th>
                <th className="bg-gray-100 p-4 border-b border-gray-300 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="p-4 border-b border-gray-300">{expense.amount}</td>
                  <td className="p-4 border-b border-gray-300">{expense.category}</td>
                  <td className="p-4 border-b border-gray-300">{expense.date}</td>
                  <td className="p-4 border-b border-gray-300">{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No expenses available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
