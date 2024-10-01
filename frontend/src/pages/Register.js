import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Register = () => {
  const [name, setName] = useState('');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      await axiosInstance.post('/auth/register', { email, password });
      // Redirect to login page
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-black">
      <div className="w-full max-w-md mx-10 p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleRegister} className="space-y-6">
          <h2 className="text-xl font-bold text-center">Introduce Yourself</h2>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Hi there! My name is</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setShowAdditionalFields(true);
              }}
              placeholder="Enter your name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Show additional fields after name is entered */}
          {showAdditionalFields && (
            <div className="space-y-2 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-gray-700">Here's my email address:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">And here's my password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign me up!
              </button>
            </div>
          )}

          <p className="text-center text-xs text-gray-500">
            By signing up, you accept the Expense-Tracker Terms of Service.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;