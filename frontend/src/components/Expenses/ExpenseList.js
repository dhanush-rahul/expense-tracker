import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faFilm } from '@fortawesome/free-solid-svg-icons';  // Entertainment Icon
import { faUtensils } from '@fortawesome/free-solid-svg-icons';  // Food Icon
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';  // Utilities Icon
import { faCar } from '@fortawesome/free-solid-svg-icons';  // Transportation Icon
import { faHome } from '@fortawesome/free-solid-svg-icons';  // Rent Icon
import { faTv } from '@fortawesome/free-solid-svg-icons';  // Subscriptions Icon

const categoryIcons = {
  Entertainment: faFilm,
  Food: faUtensils,
  Utilities: faLightbulb,
  Transportation: faCar,
  Rent: faHome,
  Subscriptions: faTv,
};

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    return (
      <div className="max-h-[29rem] overflow-y-auto">
        {(expenses && expenses.lenght > 0)} ? {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between border-b py-4 pr-5">
            <div className="flex items-center">
              {/* Category Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 mr-4">
                <span className="text-2xl">
                  <FontAwesomeIcon icon={categoryIcons[expense.category]} />
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
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </button>
              <button
                className="text-sm px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={() => onDelete(expense.id)}
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>
          </div>
          </div>
        ))} : {
          <div>
            No expenses available
          </div>
        }
      </div>
    );
  };
  
  export default ExpenseList;