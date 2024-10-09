import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useDashboardData = () => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      setIsLoading(true); // Set loading to true at the start
      setError(null); // Clear any previous errors

      // Fetch expenses data
      const fetchExpenses = async () => {
        try {
          const response = await axiosInstance.get('/expenses', { headers: { Authorization: `Bearer ${token}` } });
          setExpenses(response.data);
        } catch (error) {
          console.error('Error fetching expenses:', error);
          setError('Failed to fetch expenses');
        }
      };

      // Fetch monthly income data
      const fetchMonthlyIncome = async () => {
        try {
          const response = await axiosInstance.get('/getUserMonthlyIncome', { headers: { Authorization: `Bearer ${token}` } });
          setMonthlyIncome(response.data.monthly_income);
        } catch (error) {
          console.error('Error fetching monthly income:', error);
          setError('Failed to fetch monthly income');
        }
      };

      // Call both functions
      await Promise.all([fetchExpenses(), fetchMonthlyIncome()]);

      setIsLoading(false); // Set loading to false when both requests are done
    };

    fetchData();
  }, []);

  return { expenses, monthlyIncome, setExpenses, isLoading, error };
};

export default useDashboardData;
