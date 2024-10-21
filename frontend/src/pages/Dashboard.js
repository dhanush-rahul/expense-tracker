import React, { useState } from 'react';
import MonthlyReport from '../components/Reports/MonthlyReport';
import ExpenseList from '../components/Expenses/ExpenseList';
import CategoricalReport from '../components/Reports/CategoricalReport';
import AddEditExpense from '../components/Expenses/AddEditExpense';
import Modal from '../components/Modal';
import IncomeSavings from '../components/Expenses/IncomeSavings';
import FloatingButton from '../components/FloatingButton';
import useDashboardData from '../hooks/useDashboardData';
import axiosInstance from '../utils/axiosInstance';
import { PacmanLoader } from 'react-spinners';
import Report from '../components/Reports/Report';

const Dashboard = () => {
  const { expenses, setExpenses, monthlyIncome, setMonthlyIncome, isLoading, error } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  });
  const uniqueMonths = (expenses && expenses.length > 0) ? [...new Set(expenses.map(expense => expense.date.slice(0, 7)))] : [];
  console.log(expenses.map(expense => expense.date.slice(0, 7)))
  const handleAddExpense = () => {
    setCurrentExpense(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setCurrentExpense(expense);
    setIsModalOpen(true);
  };

  const handleDeleteExpense = async (id) => {
    await axiosInstance.delete(`/expenses/${id}`);
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSubmitSuccess = async () => {
    setIsModalOpen(false);
    const response = await axiosInstance.get('/expenses');
    setExpenses(response.data);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  // Define onUpdateIncome function to update monthly income state
  const onUpdateIncome = (newIncome) => {
    setMonthlyIncome(newIncome);  // Update the monthly income in the parent state
  };
  const renderExpenseList = () => (
    expenses.length === 0
      ? <p className="text-center text-gray-600">No expenses available.</p>
      : <ExpenseList expenses={expenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />
  );
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <PacmanLoader
        color="#b6ffa7"
        margin={2}
        size={25}
      />
    </div>; // You can replace this with a proper loading spinner
  }

  if (error) {
    return <div>{error}</div>; // Display the error message if any
  }

  return (
    <div className="h-screen bg-gradient-to-b from-gray-200 to-gray-300 overflow-hidden">
      <div className="pt-6 pl-6">
        {uniqueMonths.length > 0 && (
          <select
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            {uniqueMonths.map((month) => {
              const [year, monthNumber] = month.split('-'); // Split the string into year and month
              const formattedMonth = new Date(year, monthNumber - 1).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              });

              return (
                <option key={month} value={month}>
                  {formattedMonth}
                </option>
              );
            })}
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-gradient-to-b from-gray-200 to-gray-300 h-[93.5%]">
        {/* Left Column */}
        <div className="flex flex-col h-full space-y-4 overflow-auto">
          {/* Income and Savings Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <IncomeSavings monthlyIncome={monthlyIncome} expenses={expenses} onUpdateIncome={onUpdateIncome} />
          </div>

          {/* Expenses List Section */}
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between h-full">
            <h2 className="text-2xl font-bold text-center mb-6">Your Expenses</h2>
            {renderExpenseList()}
            <div className="mt-auto flex justify-end">
              <button
                type="button"
                onClick={handleAddExpense}
                className="px-6 py-3 text-lg bg-teal-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Reports Section) */}
        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col h-full">
          <h2 className="text-2xl font-bold text-center mb-6">Monthly Report</h2>
          <div className="flex mb-4 overflow-auto justify-center items-center">
            {expenses.length > 0 ? (
              <Report expenses={expenses} selectedMonth={selectedMonth} />
            ) : (
              <h4>No expenses available.</h4>
            )}
          </div>
        </div>

        {/* Modal for Add/Edit Expense */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddEditExpense existingExpense={currentExpense} onSubmitSuccess={handleSubmitSuccess} />
        </Modal>
        <FloatingButton />
      </div>
    </div>
  );
};

export default Dashboard;