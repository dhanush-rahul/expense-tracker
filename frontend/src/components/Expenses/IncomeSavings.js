import React, { useState } from 'react';
import Modal from '../Modal';
import axiosInstance from '../../utils/axiosInstance';
import { Doughnut } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const IncomeSavings = ({ monthlyIncome, expenses, onUpdateIncome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMonthlyIncome, setNewMonthlyIncome] = useState(monthlyIncome); // Pre-fill with current value

  const openModal = () => {
    setNewMonthlyIncome(monthlyIncome); // Set the pre-filled value
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMonthlyIncomeChange = (e) => {
    setNewMonthlyIncome(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/setUserMonthlyIncome', { monthly_income: newMonthlyIncome });
      onUpdateIncome(newMonthlyIncome); // Update the monthly income in the parent component
      closeModal(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating monthly income:', error);
    }
  };

  const spentAmount = (expenses && expenses.length > 0) ? expenses.reduce((sum, expense) => sum + expense.amount, 0) : 0;
  const remainingAmount = monthlyIncome - spentAmount;

  const incomeChartData = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        data: [spentAmount, remainingAmount],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="flex flex-col justify-between mx-10">
      <div className="relative">
    <h2 className="text-xl font-bold text-center mb-4">Your Budget Overview</h2>
    <button
      className="absolute top-0 right-0 text-blue-500 hover:underline"
      onClick={openModal}
    >
      <FontAwesomeIcon icon={faEdit} size="lg" />
    </button>
  </div>

      {/* Chart Box with Small Doughnut */}
      <div className="items-center mb-4">
        <div className="w-full text-center">
          <div className="w-24 h-24 mx-auto">
            <Doughnut data={incomeChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Income and Remaining Info */}
      <div className="text-center">
        <p className="text-gray-700">
          <strong>Total Income:</strong> CAD {monthlyIncome}
        </p>
        <p className={`text-lg ${remainingAmount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          <strong>Remaining:</strong> CAD {remainingAmount.toFixed(2)}
        </p>
      </div>

      {/* Modal for Editing Monthly Income */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Edit Monthly Income</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="monthlyIncome">
                Monthly Income
              </label>
              <input
                type="number"
                id="monthlyIncome"
                value={newMonthlyIncome}
                onChange={handleMonthlyIncomeChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition-all"
            >
              Update Income
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default IncomeSavings;
