import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import Modal from '../components/Modal';
import LoginBox from '../components/Auth/LoginBox';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token); // Store JWT
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      setErrorMessage(message); // Set the error message to show in modal
      setIsModalOpen(true); // Open modal
    }
  };
  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <LoginBox email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin}/>
      </div>
      {/* Modal for displaying error message */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-4">
          <h3 className="text-lg font-bold">Login Error</h3>
          <p className="mt-2 text-sm">{errorMessage}</p>
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
