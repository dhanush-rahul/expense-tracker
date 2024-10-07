import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Adjust the import according to your setup
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpError, setOtpError] = useState('');

  const navigate = useNavigate();
  // Function to send OTP
  const handleSendOtp = async () => {
    try {
      await axiosInstance.post('/forgot-password', { email });
      setOtpSent(true); // Set OTP sent state
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    try {
      const response = await axiosInstance.post('/verify-otp', { email, otp });
      if (response.data.verified) {
        setIsOtpVerified(true); // Set OTP verified state
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  // Function to reset password
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setOtpError('Passwords do not match');
      return;
    }
    try {
      await axiosInstance.post('/reset-password', { email, newPassword });
      alert('Password reset successful!');
      navigate('/login');
      // Redirect to login or show success message
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isOtpVerified ? 'Reset Password' : 'Forgot Password'}
        </h2>
        {!otpSent && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Email address"
                required
              />
            </div>
            <button
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition-all"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </>
        )}

        {otpSent && !isOtpVerified && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="otp">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="OTP"
                required
              />
            </div>
            {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
            <button
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition-all"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}

        {isOtpVerified && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="New Password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Confirm Password"
                required
              />
            </div>
            {otpError && <p className="text-red-500 text-sm mb-2">{otpError}</p>}
            <button
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition-all"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
