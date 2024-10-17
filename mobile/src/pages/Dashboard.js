import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import MonthlyReport from '../components/Reports/MonthlyReport';

import CategoricalReport from '../components/Reports/CategoricalReport';
import AddEditExpense from '../components/Expenses/AddEditExpense';
import Modal from '../components/Modal';
import IncomeSavings from '../components/Expenses/IncomeSavings';
import useDashboardData from '../hooks/useDashboardData';
import axiosInstance from '../utils/axiosInstance';
import FloatingButton from '../components/FloatingButton';
import ExpenseList from '../components/Expenses/ExpenseList';

const Dashboard = () => {
  const { expenses, setExpenses, monthlyIncome, isLoading, error } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  });

  const uniqueMonths = expenses.length > 0 ? [...new Set(expenses.map(expense => expense.date.slice(0, 7)))] : [];

  const handleAddExpense = () => {
    setCurrentExpense(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setCurrentExpense(expense);
    setIsModalOpen(true);
  };

  const handleDeleteExpense = async (id) => {
    await axiosInstance.delete(`/expenses/${id}`);
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSubmitSuccess = async () => {
    setIsModalOpen(false);
    const response = await axiosInstance.get('/expenses');
    setExpenses(response.data);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (error) {
    return <Text>{error}</Text>; // Display the error message if any
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Income and Savings Section */}
      <View style={styles.section}>
        <IncomeSavings monthlyIncome={monthlyIncome} expenses={expenses} />
      </View>

      {/* Expenses List Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Your Expenses</Text>
        <ExpenseList expenses={expenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />
        <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Monthly and Categorical Reports */}
      <View style={styles.section}>
        <Text style={styles.heading}>Monthly Report</Text>
        <MonthlyReport expenses={expenses} selectedMonth={selectedMonth} />
        <CategoricalReport expenses={expenses} selectedMonth={selectedMonth} />
      </View>

      {/* Modal for Add/Edit Expense */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddEditExpense existingExpense={currentExpense} onSubmitSuccess={handleSubmitSuccess} />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#00ff00',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
