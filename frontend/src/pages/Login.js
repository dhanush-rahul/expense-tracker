import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { isAuthenticated } from '../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {

      // If authenticated, redirect to dashboard or any other page
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
      console.error('Login failed:', error);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <form onSubmit={handleLogin} className="space-y-6">
          <h2 className="text-2xl text-center text-black">Log in</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          

          <button
            type="submit"
            className="font-bold w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Log in
          </button>

          <div className="text-center">
            <a href="/forgot-password" className="text-sm text-green-600 hover:underline font-bold">
              Forgot your password?
            </a>
            <a href="/register" className="text-sm text-green-600 hover:underline font-bold">
              Register Now
            </a>
          </div>

          

          
        </form>
      </div>
    </div>
  );
};

export default Login;
