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

const formatCurrency = (value) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  } else {
    return `$${value.toFixed(1)}`;
  }
};

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this expense?");
    if (isConfirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="max-h-[30rem] overflow-y-auto scrollbar-hide">
      {expenses && expenses.length > 0 ? (
        expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between border-b py-4 pr-5">

            {/* Category Icon and Description */}
            <div className="w-1/3 flex items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 mr-4">
                <span className="text-2xl">
                  <FontAwesomeIcon icon={categoryIcons[expense.category]} />
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-white font-medium">
                  {expense.description ? expense.description : expense.category}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="w-1/3 flex justify-center">
              <p className="text-white text-center">
                {(() => {
                  const [year, month, day] = expense.date.split('-');
                  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  }).toUpperCase();
                })()}
              </p>
            </div>

            {/* Amount, Edit, and Delete Buttons */}
            <div className="w-1/3 flex items-center justify-end space-x-4">
              <button
                className="w-1/4 text-sm px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                onClick={() => onEdit(expense)}
              >
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </button>

              <p className="w-1/2 text-xl font-bold text-white text-center">
                {formatCurrency(expense.amount)}
              </p>

              <button
                className="w-1/4 text-sm px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={() => handleDelete(expense.id)}
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-white">No expenses available</div>
      )}
    </div>
  );
};

export default ExpenseList;
