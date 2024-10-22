import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Report = ({ expenses, selectedMonth }) => {
  // Filter expenses by the selected month
  const filteredExpenses = expenses.filter((expense) => expense.date.startsWith(selectedMonth));

  const categories = Array.from(new Set(expenses.map((expense) => expense.category)));
  const amountsByCategory = categories.map((category) =>
    filteredExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  // State to track which categories are visible
  const [hiddenCategories, setHiddenCategories] = useState({});

  // Toggle visibility of categories
  const toggleCategoryVisibility = (category) => {
    setHiddenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getUpdatedData = (chartData) => ({
    ...chartData,
    datasets: [
      {
        ...chartData.datasets[0],
        data: chartData.datasets[0].data.map((value, index) =>
          hiddenCategories[categories[index]] ? 0 : value
        ),
      },
    ],
  });

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: amountsByCategory,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {/* Custom Legend */}
      <div className="mb-4 flex flex-wrap justify-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`cursor-pointer px-3 py-1 m-2 rounded-lg ${
              hiddenCategories[category] ? 'bg-transparent text-gray-400 line-through' : 'text-white'
            }`}
            style={!hiddenCategories[category] ? { backgroundColor: chartData.datasets[0].backgroundColor[index] } : {}}
            onClick={() => toggleCategoryVisibility(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="w-full flex justify-center mb-8">
        <div className="max-w-lg w-full bg-gray-800 p-4 rounded-lg">
          <Bar
            data={getUpdatedData(chartData)}
            options={{
              responsive: true,
              plugins: { 
                legend: { display: false },
                tooltip: { backgroundColor: '#333', titleColor: '#fff', bodyColor: '#fff' },
              },
              scales: {
                x: {
                  ticks: { color: '#fff' }, // X-axis labels color
                  grid: { color: '#555' } // Grid color for dark theme
                },
                y: {
                  ticks: {
                    color: '#fff', // Y-axis labels color
                    // This callback formats the ticks to alternate and add "k" for values above 1000
                    callback: function(value) {
                      if (value >= 1000) {
                        return value / 1000 + 'k'; // For values greater than 1000, format as "1k", "2k", etc.
                      }
                      return value % 200 === 0 ? value : ''; // Show every alternate tick value
                    }
                  },
                  grid: { color: '#555' } // Grid color for dark theme
                },
              },
            }}
          />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="w-full flex justify-center h-[40vh] bg-gray-800 p-4 rounded-lg">
        <Pie
          data={getUpdatedData(chartData)}
          options={{
            responsive: true,
            plugins: { 
              legend: { display: false },
              tooltip: { backgroundColor: '#333', titleColor: '#fff', bodyColor: '#fff' },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Report;
