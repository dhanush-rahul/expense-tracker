// hooks/useDashboardData.js
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useDashboardData = () => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const [expensesResponse, incomeResponse] = await Promise.all([
          axiosInstance.get('/expenses', { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get('/getUserMonthlyIncome', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setExpenses(expensesResponse.data);
        setMonthlyIncome(incomeResponse.data.monthly_income);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { expenses, monthlyIncome, setExpenses };
};

export default useDashboardData;
