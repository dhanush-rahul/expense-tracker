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
    isModalOpen: false,
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
      toast.success("Login successful")
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message)
      setLoginData((prevData) => ({
        ...prevData,
        errorMessage: message,
        isModalOpen: true,
      }));
    }
  };

  const closeModal = () => {
    setLoginData((prevData) => ({ ...prevData, isModalOpen: false }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <LoginBox loginData={loginData} setLoginData={setLoginData} handleLogin={handleLogin} />
      </div>

      {/* Modal for displaying error message */}
      <Modal isOpen={loginData.isModalOpen} onClose={closeModal}>
        <div className="p-4">
          <h3 className="text-lg font-bold">Login Error</h3>
          <p className="mt-2 text-sm">{loginData.errorMessage}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
