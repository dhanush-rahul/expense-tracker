import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import axiosInstance from '../../utils/axiosInstance';

const AddEditExpense = ({ existingExpense = false, onSubmitSuccess }) => {
  const [amount, setAmount] = useState(existingExpense?.amount || '');
  const [category, setCategory] = useState(existingExpense?.category || '');
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(existingExpense?.date || new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState(existingExpense?.description || '');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/getCategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const data = { amount, category, date, description };
    try {
      if (existingExpense) {
        await axiosInstance.put(`/expenses/${existingExpense.id}`, data);
      } else {
        await axiosInstance.post('/expenses', data);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting expense:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{existingExpense ? 'Edit Expense' : 'Add Expense'}</Text>
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.input}
      >
        {categories.map(cat => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title={existingExpense ? 'Edit' : 'Add'} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginVertical: 8,
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default AddEditExpense;
