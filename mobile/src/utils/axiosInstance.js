import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://expense-tracker-cpg9.vercel.app/api', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Use this only if you're working with cookies (if necessary)
});

export default axiosInstance;