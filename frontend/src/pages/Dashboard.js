import React, { useState, useEffect } from 'react';
import useDashboardData from '../hooks/useDashboardData';
import axiosInstance from '../utils/axiosInstance';
import { PacmanLoader } from 'react-spinners';
import IncomeSavings from '../components/Expenses/IncomeSavings';
import ExpenseList from '../components/Expenses/ExpenseList';
import Report from '../components/Reports/Report';
import Modal from '../components/Modal';
import AddEditExpense from '../components/Expenses/AddEditExpense';
import FloatingButton from '../components/FloatingButton';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  // Retrieve the selected month from localStorage or fallback to current month
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const storedMonth = localStorage.getItem('selectedMonth');
    if (storedMonth) {
      return storedMonth;
    }
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  });
  
  // Generate all months for the current year (e.g., ['2024-01', '2024-02', ..., '2024-12'])
  const currentYear = new Date().getFullYear();
  const allMonths = Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, '0');
    return `${currentYear}-${month}`;
  });

  // Fetch data based on the selected month
  const { expenses, monthlyIncome, spent, setExpenses, setMonthlyIncome, setSpent, isLoading } = useDashboardData(selectedMonth);

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
    setExpenses(expenses.filter((expense) => expense.id !== id));
    // Fetch and update the updated income and spent values after deletion
    updateIncomeAndSpent();
  };

  // Function to fetch and update income and spent after adding/editing expense
  const updateIncomeAndSpent = async () => {
    const overviewResponse = await axiosInstance.get('/getMonthlyOverview', {
      params: { month: selectedMonth },
    });
    setMonthlyIncome(overviewResponse.data.monthly_income || 0);
    setSpent(overviewResponse.data.spent || 0);
  };

  const handleSubmitSuccess = async () => {
    setIsModalOpen(false);
    // Fetch the updated expenses after adding/editing an expense
    const response = await axiosInstance.get('/expenses', { params: { month: selectedMonth } });
    setExpenses(response.data);
    // Fetch and update income and spent after the expense change
    updateIncomeAndSpent();
  };

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth); // Update the selected month
    localStorage.setItem('selectedMonth', newMonth); // Store the selected month in localStorage
  };

  const onUpdateIncome = (newIncome) => {
    setMonthlyIncome(newIncome); // Update the monthly income in the parent state
  };

  const renderExpenseList = () => (
    expenses.length === 0
      ? <p className="text-center text-white">No expenses available.</p>
      : <ExpenseList expenses={expenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <PacmanLoader color="#b6ffa7" margin={2} size={25} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <div className="pt-6 pl-6">
        <select
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md"
        >
          {allMonths.map((month) => {
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-gradient-to-b from-gray-900 to-gray-800 h-[93.5%]">
        {/* Left Column */} 
        <div className="flex flex-col h-full space-y-4 overflow-auto">
          {/* Income and Savings Section */}
          <div className="bg-gray-700 text-white rounded-lg shadow-md p-4">
            <IncomeSavings monthlyIncome={monthlyIncome} spent={spent} onUpdateIncome={onUpdateIncome} />
          </div>

          {/* Expenses List Section */}
          <div className="bg-gray-700 text-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
            <h2 className="text-2xl font-bold text-center mb-6">Your Expenses</h2>
            {renderExpenseList()}
            <div className="mt-auto flex justify-end">
              <button
                type="button"
                onClick={handleAddExpense}
                className="px-6 py-3 text-lg bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Reports Section) */}
        <div className="bg-gray-700 text-white rounded-lg shadow-md p-4 flex flex-col h-full">
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
