import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const CategoricalReport = ({ expenses, selectedMonth }) => {
  // Filter expenses by the selected month
  const filteredExpenses = expenses.length > 0
    ? expenses.filter((expense) => expense.date.startsWith(selectedMonth))
    : [];

  const categories = filteredExpenses.length > 0
    ? Array.from(new Set(filteredExpenses.map((expense) => expense.category)))
    : [];

  const amountsByCategory = categories.map((category) =>
    filteredExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  // Data for the chart
  const data = {
    labels: categories,
    datasets: [
      {
        data: amountsByCategory,
      },
    ],
  };

  // Chart configuration options
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 2, // Optional, rounds the chart data
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Blue bars
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View>
      <Text style={styles.title}>Categorical Report for {selectedMonth}</Text>
      {categories.length > 0 ? (
        <BarChart
          data={data}
          width={Dimensions.get("window").width - 40} // Make the chart responsive
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
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default CategoricalReport;
