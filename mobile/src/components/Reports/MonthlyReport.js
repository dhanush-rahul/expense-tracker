import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet } from 'react-native';

const MonthlyReport = ({ expenses, selectedMonth }) => {
  const filteredExpenses = expenses.filter(expense => expense.date.startsWith(selectedMonth));
  const categories = [...new Set(filteredExpenses.map(expense => expense.category))];
  const amountsByCategory = categories.map(category => filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0));

  const data = {
    labels: categories,
    datasets: [{ data: amountsByCategory }],
  };

  return (
    <View>
      <Text style={styles.title}>Monthly Report</Text>
      <BarChart data={data} width={300} height={220} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MonthlyReport;
