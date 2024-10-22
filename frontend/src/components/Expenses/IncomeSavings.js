import React, { useState } from 'react';
import Modal from '../Modal'; // Assuming you have a Modal component
import axiosInstance from '../../utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const IncomeSavings = ({ monthlyIncome, spent, onUpdateIncome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMonthlyIncome, setNewMonthlyIncome] = useState(monthlyIncome);

  const remainingAmount = monthlyIncome - spent;

  const openModal = () => {
    setNewMonthlyIncome(monthlyIncome);
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
      onUpdateIncome(newMonthlyIncome);
      closeModal();
    } catch (error) {
      console.error('Error updating monthly income:', error);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `$ ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$ ${(value / 1000).toFixed(1)}k`;
    } else {
      return `$ ${value.toFixed(2)}`;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Total Box */}
      <div className="border-2 border-green-500 rounded-lg flex flex-col items-center justify-center">
        <div className="w-full bg-green-600 text-white font-bold p-2 text-center">
          Total
        </div>
        <div className="w-full relative flex flex-col items-center justify-center py-6">
          <p className="text-4xl text-green-500">{formatCurrency(monthlyIncome)}</p>
          <button
            onClick={openModal}
            className="absolute top-2 right-2 text-blue-400 hover:underline"
          >
            <FontAwesomeIcon icon={faEdit} size="lg" />
          </button>
        </div>
      </div>

      {/* Spent Box */}
      <div className="border-2 border-red-500 rounded-lg flex flex-col items-center justify-center">
        <div className="w-full bg-red-600 text-white font-bold p-2 text-center">
          Spent
        </div>
        <div className="w-full flex items-center justify-center py-6">
          <p className="text-4xl text-red-500">{formatCurrency(spent)}</p>
        </div>
      </div>

      {/* Remaining Box */}
      <div className="border-2 border-blue-500 rounded-lg flex flex-col items-center justify-center">
        <div className="w-full bg-blue-600 text-white font-bold p-2 text-center">
          Remaining
        </div>
        <div className="w-full flex items-center justify-center py-6">
          <p className={`text-4xl ${remainingAmount < 0 ? 'text-red-500' : 'text-blue-500'}`}>
            {formatCurrency(remainingAmount)}
          </p>
        </div>
      </div>

      {/* Modal for Editing Monthly Income */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Edit Monthly Income</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Income
                </label>
                <input
                  type="number"
                  value={newMonthlyIncome}
                  onChange={handleMonthlyIncomeChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500"
              >
                Update Income
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default IncomeSavings;
