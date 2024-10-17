import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';  // Use React Navigation for navigation

const useDashboardData = () => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigation = useNavigation(); // Use navigation for redirection

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');  // Await AsyncStorage call
        if (!token) {
          navigation.navigate('Login');  // Redirect to login screen using navigation
          return;
        }

        setIsLoading(true);
        setError(null); // Clear any existing errors before new fetch

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
  }, [navigation]);  // Make sure navigation is included as a dependency

  return { expenses, monthlyIncome, setExpenses, isLoading, error };
};

export default useDashboardData;
