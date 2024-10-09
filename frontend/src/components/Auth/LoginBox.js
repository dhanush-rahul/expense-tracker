import React from "react";

const LoginBox = ({ loginData, setLoginData, handleLogin }) => {
  const { email, password } = loginData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <h2 className="text-2xl text-center text-black">Log in</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email address</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email address"
          required
          className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
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
        <span>&nbsp;</span>
        <a href="/register" className="text-sm text-green-600 hover:underline font-bold">
          Register Now
        </a>
      </div>
    </form>
  );
};

export default LoginBox;
