import React from 'react';

const categoryIcons = {
  Food: '🍔',
  Utilities: '💡',
  Transportation: '🚗',
  Rent: '🏠',
  Subscriptions: '📺',
};

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    return (
      <div className="max-h-[45rem] overflow-y-auto">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between border-b py-4">
            <div className="flex items-center">
              {/* Category Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 mr-4">
                <span className="text-2xl">
                  {categoryIcons[expense.category] || '❓'} {/* Default icon if category is unknown */}
                </span>
              </div>
  
              {/* Expense Info */}
              <div>
                <p className="text-gray-800 font-medium">{expense.description}</p>
                <p className="text-gray-500 text-sm">{new Date(expense.date).toLocaleDateString()}</p>
              </div>
            </div>
  
            {/* Amount and Buttons */}
          <div className="text-right">
            <p className="text-gray-800 font-bold">CAD {expense.amount.toFixed(2)}</p>
            <p className="text-gray-500 text-sm">{expense.category}</p>

            {/* Edit and Delete Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                className="text-sm px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                onClick={() => onEdit(expense)}
              >
                Edit
              </button>
              <button
                className="text-sm px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </div>
          </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ExpenseList;