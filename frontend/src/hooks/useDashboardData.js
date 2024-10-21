import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useDashboardData = (selectedMonth) => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [spent, setSpent] = useState(0); // To store the spent value
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
        // Fetch Expenses for the selected month
        const expensesResponse = await axiosInstance.get('/expenses', {
          headers: { Authorization: `Bearer ${token}` },
          params: { month: selectedMonth }
        });
        setExpenses(expensesResponse.data);

        // Fetch Monthly Overview for the selected month
        const overviewResponse = await axiosInstance.get('/getMonthlyOverview', {
          headers: { Authorization: `Bearer ${token}` },
          params: { month: selectedMonth }
        });
        setMonthlyIncome(overviewResponse.data.monthly_income);
        setSpent(overviewResponse.data.spent);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false); // Ensure loading is stopped regardless of success or failure
      }
    };

    fetchData();
  }, [selectedMonth]); // Listen for changes in selectedMonth

  return { expenses, monthlyIncome, spent, setMonthlyIncome, setExpenses, isLoading, error };
};

export default useDashboardData;