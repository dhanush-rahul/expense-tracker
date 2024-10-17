import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const MonthlyReport = ({ expenses, selectedMonth }) => {
  // Filter expenses by the selected month
  const filteredExpenses = expenses.filter(expense => expense.date.startsWith(selectedMonth));
  
  // Get unique categories
  const categories = [...new Set(filteredExpenses.map(expense => expense.category))];
  
  // Get amounts by category
  const amountsByCategory = categories.map(category => 
    filteredExpenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  // Data for the BarChart
  const data = {
    labels: categories.length > 0 ? categories : ['No Data'], // Default to 'No Data' if empty
    datasets: [
      {
        data: amountsByCategory.length > 0 ? amountsByCategory : [0], // Default to 0 if empty
      },
    ],
  };

  // Chart configuration options
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2, // Rounds the numbers to 2 decimal places
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Bar color (blue)
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color (black)
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: '#e3e3e3',
      strokeDasharray: '4', // Add dashed background lines
    },
  };

  return (
    <View>
      <Text style={styles.title}>Monthly Report for {selectedMonth}</Text>
      {categories.length > 0 ? (
        <BarChart
          data={data}
          width={Dimensions.get('window').width - 40} // Responsive width
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30} // Rotate labels for better visibility
          style={styles.chartStyle}
        />
      ) : (
        <Text style={styles.noDataText}>No data available for this month.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MonthlyReport;
