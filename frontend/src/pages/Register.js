// Register.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import RegisterBox from '../components/Auth/RegisterBox';

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
      return;
    }
    try {
      await axiosInstance.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        monthlyIncome: formData.monthlyIncome,
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-black">
      <div className="w-full max-w-md mx-10 p-8 bg-white rounded-lg shadow-md">
        <RegisterBox formData={formData} setFormData={setFormData} handleRegister={handleRegister} />
      </div>
    </div>
  );
};

export default Register;
