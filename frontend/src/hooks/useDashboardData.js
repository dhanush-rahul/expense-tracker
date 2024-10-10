import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useDashboardData = () => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      setIsLoading(true);
      setError(null); // Clear any existing errors before new fetch

      try {
        // Fetch Expenses
        const expensesResponse = await axiosInstance.get('/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(expensesResponse.data);

        // Fetch Monthly Income
        const incomeResponse = await axiosInstance.get('/getUserMonthlyIncome', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMonthlyIncome(incomeResponse.data.monthly_income);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false); // Ensure loading is stopped regardless of success or failure
      }
    };

    fetchData();
  }, []);

  return { expenses, monthlyIncome, setExpenses, isLoading, error };
};

export default useDashboardData;