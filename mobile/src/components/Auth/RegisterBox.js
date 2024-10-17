import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterBox = ({ formData, setFormData, handleRegister }) => {
  return (
    <ScrollView contentContainerStyle={styles.form}>
      <Text style={styles.heading}>Introduce Yourself</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hi there! My name is</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(value) => setFormData({ ...formData, name: value })}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Here's my email address:</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => setFormData({ ...formData, email: value })}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>And here's my password:</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(value) => setFormData({ ...formData, password: value })}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm password:</Text>
        <TextInput
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(value) => setFormData({ ...formData, confirmPassword: value })}
          placeholder="Confirm your password"
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Set your monthly income:</Text>
        <TextInput
          style={styles.input}
          value={formData.monthlyIncome.toString()}
          onChangeText={(value) => setFormData({ ...formData, monthlyIncome: parseInt(value, 10) || 0 })}
          placeholder="Enter your monthly income"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign me up!</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By signing up, you accept the Expense-Tracker Terms of Service.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ed8936',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  terms: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RegisterBox;
