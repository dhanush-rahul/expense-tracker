// pages/Reports.js
import React, { useState, useEffect,useRef } from 'react';
import axios from '../services/api';
import { Bar } from 'react-chartjs-2';

const Reports = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/reports?month=${month}&year=${year}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    };
    fetchReports();
  }, [month, year]);

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: 'Expenses',
        data: data.map((item) => item.amount),
      },
    ],
  };

  return (
    <div>
      <h2>Monthly Reports</h2>
      <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      <Bar data={chartData} />
    </div>
  );
};

export default Reports;
