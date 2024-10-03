import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import MonthlyReport from '../components/Reports/MonthlyReport';
import ExpenseList from '../components/Expenses/ExpenseList';
import CategoricalReport from '../components/Reports/CategoricalReport';
import AddEditExpense from './AddEditExpense';
import Modal from '../components/Modal';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null); // For edit mode

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Adding 1 to get the correct month (0-indexed)
    return `${year}-${month}`;
  });
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const navigate = useNavigate();

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const months = (expenses && expenses.length > 0) ? expenses.map((expense) => expense.date.slice(0, 7)) : [];
    const uniqueMonths = Array.from(new Set(months));
    setUniqueMonths(uniqueMonths);

    if (uniqueMonths.length > 0) {
      setSelectedMonth(uniqueMonths[0]);
    }
  }, [expenses]);

  const addExpense = () => {
    setCurrentExpense(null); // Reset for adding a new expense
    setIsModalOpen(true);
  };
   // Edit handler
   const handleEditExpense = (expense) => {
    setCurrentExpense(expense); // Set the selected expense for editing
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Delete handler
  const handleDeleteExpense = async (id) => {
    const token = localStorage.getItem('token');
    await axiosInstance.delete(`/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExpenses(expenses.filter(expense => expense.id !== id)); // Remove the deleted expense from the list
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-gradient-to-b from-gray-200 to-gray-300">
      {/* Expenses List Section */}
      <div className="flex flex-col justify-between mx-10 p-8 bg-white rounded-lg shadow-md h-full">
        <div className="overflow-auto"> {/* Add this for making the list scrollable independently */}
          <h2 className="text-2xl font-bold text-center mb-6">Your Expenses</h2>
          {expenses && expenses.length > 0 ? (
            <ExpenseList
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
          ) : (
            <p className="text-center text-gray-600">No expenses available.</p>
          )}
        </div>
        <div className="mt-auto flex justify-end">
          <button
            type="button"
            className="px-6 py-3 text-lg bg-teal-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={addExpense}
          >
            Add Expense
          </button>
        </div>
      </div>

      {/* Reports Section */}
      <div className="flex flex-col mx-10 p-8 bg-white rounded-lg shadow-md h-full">
        <h2 className="text-2xl font-bold text-center mb-6">Monthly Report</h2>
        {expenses && expenses.length > 0 ?
        <div className="mb-4">
          <select
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            {uniqueMonths.map((month) => (
              <option key={month} value={month}>
                {new Date(month).toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </option>
            ))}
          </select>
        </div>
        :
          <span></span>}
        <div className="flex-1 flex flex-col">
          {/* Adjust chart height dynamically to prevent overflow */}
          <div className="flex-1 max-h-[300px] mb-4"> {/* Limit height to prevent scrolling */}
            {expenses && expenses.length > 0 ?
            <MonthlyReport expenses={expenses} selectedMonth={selectedMonth} />
            :
            <div>
              <h4>No expenses available.</h4>
            </div>
            }
          </div>
          <div className="flex-1 max-h-[300px]"> {/* Limit height to prevent scrolling */}
          {expenses && expenses.length > 0 ?
            <CategoricalReport expenses={expenses} selectedMonth={selectedMonth} />
            :
            <div>
              <h4>No expenses available.</h4>
            </div>
            }
          </div>
        </div>
      </div>
      {/* Modal for Add/Edit Expense */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddEditExpense existingExpense={currentExpense} />
      </Modal>
    </div>
  );
};

export default Dashboard;
