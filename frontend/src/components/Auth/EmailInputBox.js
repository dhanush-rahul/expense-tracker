import React from "react";

const EmailInputBox = ({ email, setEmail, handleSendOtp }) => {
  return (
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
  );
};

export default EmailInputBox;
