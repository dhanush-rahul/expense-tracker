import React, { useState } from 'react';
import MonthlyReport from '../components/Reports/MonthlyReport';
import ExpenseList from '../components/Expenses/ExpenseList';
import CategoricalReport from '../components/Reports/CategoricalReport';
import AddEditExpense from '../components/Expenses/AddEditExpense';
import Modal from '../components/Modal';
import IncomeSavings from '../components/Expenses/IncomeSavings';
import FloatingButton from '../components/FloatingButton';
import useDashboardData from '../hooks/useDashboardData';

const Dashboard = () => {
  const { expenses, monthlyIncome, setExpenses } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  });
  const uniqueMonths = [...new Set(expenses.map(expense => expense.date.slice(0, 7)))];

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

  const renderExpenseList = () => (
    expenses.length === 0
      ? <p className="text-center text-gray-600">No expenses available.</p>
      : <ExpenseList expenses={expenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />
  );

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-gradient-to-b from-gray-200 to-gray-300">
      {/* Left Column */}
      <div className="flex flex-col h-full space-y-4">
        {/* Income and Savings Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <IncomeSavings monthlyIncome={monthlyIncome} expenses={expenses} />
        </div>

        {/* Expenses List Section */}
        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between h-full overflow-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Your Expenses</h2>
          {renderExpenseList()}
          <div className="mt-auto flex justify-end">
            <button type="button" onClick={handleAddExpense} className="px-6 py-3 text-lg bg-teal-500 text-white rounded-lg hover:bg-green-600 transition">
              Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* Right Column (Reports Section) */}
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6">Monthly Report</h2>
        {uniqueMonths.length > 0 && (
          <select id="month-select" value={selectedMonth} onChange={handleMonthChange} className="px-4 py-2 border border-gray-300 rounded-md">
            {uniqueMonths.map(month => (
              <option key={month} value={month}>
                {new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </option>
            ))}
          </select>
        )}
        <div className="flex-1 max-h-[300px] mb-4 overflow-auto flex justify-center items-center">
          {expenses.length > 0 ? <MonthlyReport expenses={expenses} selectedMonth={selectedMonth} /> : <h4>No expenses available.</h4>}
        </div>
        <div className="flex-1 max-h-[300px] flex justify-center items-center">
          {expenses.length > 0 ? <CategoricalReport expenses={expenses} selectedMonth={selectedMonth} /> : <h4>No expenses available.</h4>}
        </div>
      </div>

      {/* Modal for Add/Edit Expense */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddEditExpense existingExpense={currentExpense} onSubmitSuccess={handleSubmitSuccess} />
      </Modal>
      <FloatingButton />
    </div>
  );
};

export default Dashboard;