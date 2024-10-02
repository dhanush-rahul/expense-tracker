import React from 'react';

const categoryIcons = {
  Food: '🍔',
  Utilities: '💡',
  Transportation: '🚗',
  Rent: '🏠',
  Subscriptions: '📺',
};

const ExpenseList = ({ expenses }) => {
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
  
            {/* Amount */}
            <div className="text-right">
              <p className="text-gray-800 font-bold">CAD {expense.amount.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">{expense.category}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ExpenseList;