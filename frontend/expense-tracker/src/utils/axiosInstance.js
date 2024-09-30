import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Flask API URL
});

// Attach JWT token for authenticated requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;