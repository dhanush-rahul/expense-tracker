import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';  // Using PieChart as a substitute for DoughnutChart
import { Dimensions } from 'react-native';
import Modal from '../Modal';

const IncomeSavings = ({ monthlyIncome, expenses, onUpdateIncome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMonthlyIncome, setNewMonthlyIncome] = useState(monthlyIncome);

  const spentAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingAmount = monthlyIncome - spentAmount;

  const incomeChartData = [
    {
      name: 'Spent',
      amount: spentAmount,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Remaining',
      amount: remainingAmount,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Budget Overview</Text>
      <PieChart
        data={incomeChartData}
        width={Dimensions.get('window').width - 50} // from react-native
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text>Total Income: CAD {monthlyIncome}</Text>
      <Text>Remaining: CAD {remainingAmount.toFixed(2)}</Text>

      <TouchableOpacity onPress={() => setIsModalOpen(true)}>
        <Text>Edit Monthly Income</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text>Edit your monthly income</Text>
        <TextInput
          value={newMonthlyIncome.toString()}
          onChangeText={setNewMonthlyIncome}
          keyboardType="numeric"
        />
        <Button title="Save" onPress={() => {
          onUpdateIncome(newMonthlyIncome);
          setIsModalOpen(false);
        }} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default IncomeSavings;
