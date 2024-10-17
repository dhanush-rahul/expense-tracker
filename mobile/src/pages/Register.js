import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import axiosInstance from '../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import RegisterBox from '../components/Auth/RegisterBox';
import Toast from 'react-native-toast-message';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    monthlyIncome: 0,
  });

  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Dashboard');
      }
    };
    checkAuth();
  }, [navigation]);

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Toast.show({ type: 'error', text1: 'Passwords do not match' });
      return;
    }
    try {
      await axiosInstance.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        monthlyIncome: formData.monthlyIncome,
      });
      Toast.show({ type: 'success', text1: 'Registration successful! Please login.' });
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed:', error);
      Toast.show({ type: 'error', text1: 'Registration failed' });
    }
  };

  return (
    <View style={styles.container}>
      <RegisterBox formData={formData} setFormData={setFormData} handleRegister={handleRegister} />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default Register;
