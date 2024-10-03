import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
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
  const addExpense = () => {
    navigate('/add-expense');
}
  return (
    <div className="min-h-screen grid grid-cols-2 gap-2 justify-center bg-gradient-to-b from-gray-200 to-gray-300 text-black">
      <div className="mx-10 p-8 bg-white rounded-lg shadow-md relative">
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
        <button type="button" className="absolute bottom-0 right-0 px-6 py-3 m-2 text-lg bg-teal-500 text-white rounded-lg hover:bg-green-600 transition" onClick={()=>{addExpense()}}>Add Expense</button>
      </div>
      <div className="mx-10 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Monthly Report</h2>
      </div>
      <div className="mx-10 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Categorical Report</h2>
      </div>
    </div>
  );
};

export default Dashboard;
