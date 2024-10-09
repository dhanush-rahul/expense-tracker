import React from "react";

const OtpBox = ({ otp, setOtp, otpError, handleVerifyOtp }) => {
  return (
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
  );
};

export default OtpBox;
