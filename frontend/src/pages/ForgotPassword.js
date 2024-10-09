import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Adjust the import according to your setup
import { useNavigate } from 'react-router-dom';
import EmailInputBox from '../components/Auth/EmailInputBox';
import OtpBox from '../components/Auth/OtpBox';
import PasswordResetBox from '../components/Auth/PasswordResetBox';

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
          <EmailInputBox 
            email={email}
            setEmail={setEmail}
            handleSendOtp={handleSendOtp}
          />
        )}
        
        {otpSent && !isOtpVerified && (
          <OtpBox 
            otp={otp}
            setOtp={setOtp}
            otpError={otpError}
            handleVerifyOtp={handleVerifyOtp}
          />
        )}
        
        {isOtpVerified && (
          <PasswordResetBox
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            otpError={otpError}
            handleResetPassword={handleResetPassword}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
