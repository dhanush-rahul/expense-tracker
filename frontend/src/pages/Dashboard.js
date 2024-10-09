// Dashboard.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import MonthlyReport from '../components/Reports/MonthlyReport';
import ExpenseList from '../components/Expenses/ExpenseList';
import CategoricalReport from '../components/Reports/CategoricalReport';
import AddEditExpense from '../components/Expenses/AddEditExpense';
import Modal from '../components/Modal';
import IncomeSavings from '../components/Expenses/IncomeSavings';
import FloatingButton from '../components/FloatingButton';

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
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
  
      try {
        const response = await axiosInstance.get('/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
  
    fetchExpenses();
  }, []);
  useEffect(()=>{
    const fetchIncome = async () => {
      const token = localStorage.getItem('token');

    try{
    const response = await axiosInstance.get('/getUserMonthlyIncome', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMonthlyIncome(response.data.monthly_income);
    }
    catch(error){
      console.error('Error fetching', error);

    }
  }
  fetchIncome();
  },[])

  useEffect(() => {
    const months = expenses.length > 0 ? expenses.map((expense) => expense.date.slice(0, 7)) : [];
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

  // Success handler after adding or editing expense
  const handleSubmitSuccess = async () => {
    setIsModalOpen(false); // Close the modal
    const response = await axiosInstance.get('/expenses'); // Fetch updated expenses
    setExpenses(response.data);
  };

  // Callback to update the monthly income
  const handleUpdateMonthlyIncome = (newIncome) => {
    setMonthlyIncome(newIncome); // Update the local state with the new income
  };

  // Edit handler
  const handleEditExpense = (expense) => {
    setCurrentExpense(expense); // Set the selected expense for editing
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteExpense = async (id) => {
    await axiosInstance.delete(`/expenses/${id}`);
    setExpenses(expenses.filter(expense => expense.id !== id)); // Remove the deleted expense from the list
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-gradient-to-b from-gray-200 to-gray-300">
      {/* Left Column */}
      <div className="flex flex-col h-full space-y-4">
        
        {/* Income and Savings Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <IncomeSavings
            monthlyIncome={monthlyIncome}
            expenses={expenses}
            onUpdateIncome={handleUpdateMonthlyIncome} // Pass callback to update monthly income
          />
        </div>
        
        {/* Expenses List Section */}
        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between h-full overflow-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Your Expenses</h2>
          
          {expenses.length > 0 ? (
            <ExpenseList
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          ) : (
            <p className="text-center text-gray-600">No expenses available.</p>
          )}
          
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
      </div>

      {/* Right Column (Reports Section) */}
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6">Monthly Report</h2>
        
        {expenses.length > 0 ? (
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
        ) : (
          <span></span>
        )}
        
        <div className="flex-1 max-h-[300px] mb-4 overflow-auto flex justify-center items-center">
          {expenses.length > 0 ? (
            <MonthlyReport expenses={expenses} selectedMonth={selectedMonth} />
          ) : (
            <div>
              <h4>No expenses available.</h4>
            </div>
          )}
        </div>
        
        <div className="flex-1 max-h-[300px]  flex justify-center items-center">
          {expenses.length > 0 ? (
            <CategoricalReport expenses={expenses} selectedMonth={selectedMonth} />
          ) : (
            <div>
              <h4>No expenses available.</h4>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Expense */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddEditExpense existingExpense={currentExpense} onSubmitSuccess={handleSubmitSuccess} />
      </Modal>
      <FloatingButton/>
    </div>
  );
};

export default Dashboard;
