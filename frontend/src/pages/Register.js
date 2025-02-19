// Register.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import RegisterBox from '../components/Auth/RegisterBox';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    monthlyIncome: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
    try {
      await axiosInstance.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        monthlyIncome: formData.monthlyIncome,
      });
      toast.success('Registration successful! Please login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800 text-black">
      <div className="w-full max-w-md mx-10 p-8 bg-white rounded-lg shadow-md bg-gray-700">
        <RegisterBox formData={formData} setFormData={setFormData} handleRegister={handleRegister} />
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Register;
