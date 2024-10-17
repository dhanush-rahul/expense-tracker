import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { DoughnutChart } from 'react-native-chart-kit';
import Modal from '../Modal';

const IncomeSavings = ({ monthlyIncome, expenses, onUpdateIncome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMonthlyIncome, setNewMonthlyIncome] = useState(monthlyIncome);

  const spentAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingAmount = monthlyIncome - spentAmount;

  const incomeChartData = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        data: [spentAmount, remainingAmount],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Budget Overview</Text>
      <DoughnutChart data={incomeChartData} width={200} height={200} />

      <Text>Total Income: CAD {monthlyIncome}</Text>
      <Text>Remaining: CAD {remainingAmount.toFixed(2)}</Text>

      <TouchableOpacity onPress={() => setIsModalOpen(true)}>
        <Text>Edit Monthly Income</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text>Edit your monthly income</Text>
        <TextInput value={newMonthlyIncome.toString()} onChangeText={setNewMonthlyIncome} />
        <Button title="Save" onPress={() => onUpdateIncome(newMonthlyIncome)} />
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
