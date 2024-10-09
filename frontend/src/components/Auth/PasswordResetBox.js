import React from "react";

const PasswordResetBox = ({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, otpError, handleResetPassword }) => {
  return (
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
  );
};

export default PasswordResetBox;
