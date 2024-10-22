import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import Modal from '../components/Modal';
import LoginBox from '../components/Auth/LoginBox';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    errorMessage: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: loginData.email,
        password: loginData.password,
      });
      localStorage.setItem('token', response.data.access_token);
      toast.success("Login successful");
      // Delay navigation to allow toast to appear
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      setLoginData((prevData) => ({
        ...prevData,
        errorMessage: message,
      }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="bg-gray-700 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
        <LoginBox loginData={loginData} setLoginData={setLoginData} handleLogin={handleLogin} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
