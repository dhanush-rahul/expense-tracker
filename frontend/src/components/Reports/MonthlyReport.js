import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyReport = ({ expenses, selectedMonth }) => {
  // Filter expenses by the selected month
  const filteredExpenses = (expenses && expenses.length > 0)
  ? expenses.filter((expense) => expense.date.startsWith(selectedMonth))
  : [];

  const categories = (expenses && expenses.length > 0)
  ? Array.from(new Set(expenses.map((expense) => expense.category)))
  : [];
  const amountsByCategory = categories.map((category) =>
    filteredExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: `Expenses for ${selectedMonth}`,
        data: amountsByCategory,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Monthly Report for ${selectedMonth}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MonthlyReport;
