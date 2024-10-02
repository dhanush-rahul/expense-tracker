import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoricalReport = ({ expenses, selectedMonth }) => {
  // Filter expenses by the selected month
  const filteredExpenses = expenses.filter((expense) =>
    expense.date.startsWith(selectedMonth)
  );

  const categories = Array.from(new Set(filteredExpenses.map((expense) => expense.category)));
  const amountsByCategory = categories.map((category) =>
    filteredExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
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
        text: `Categorical Report for ${selectedMonth}`,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex justify-center">
        <div className="relative h-[40vh] w-[80vw]">   
            <Pie data={data} options={options} />
        </div>
    </div>
    );
};

export default CategoricalReport;
