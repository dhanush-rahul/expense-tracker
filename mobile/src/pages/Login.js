import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import axiosInstance from '../utils/axiosInstance';  // Assuming this works for React Native
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { isAuthenticated } from '../utils/auth';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import LoginBox from '../components/Auth/LoginBox';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    errorMessage: '',
  });

  const navigation = useNavigation();

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (await isAuthenticated()) {
//         navigation.navigate('Dashboard');
//       }
//     };
//     checkAuth();
//   }, [navigation]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: loginData.email,
        password: loginData.password,
      });
      console.log("I'm here")

      await AsyncStorage.setItem('token', response.data.access_token);
      Toast.show({
        type: 'success',
        text1: 'Login successful',
      });
      navigation.navigate('Dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      Toast.show({
        type: 'error',
        text1: message,
      });
      setLoginData((prevData) => ({
        ...prevData,
        errorMessage: message,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <LoginBox loginData={loginData} setLoginData={setLoginData} handleLogin={handleLogin} />
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
    paddingHorizontal: 20,
  },
});

export default Login;
