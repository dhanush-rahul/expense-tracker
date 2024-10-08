import axios from 'axios';
import { createRoot } from 'react-dom/client';
import Modal from '../components/Modal'; // Assuming you have a Modal component

const axiosInstance = axios.create({
  baseURL: 'https://expense-tracker-cpg9.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

// Global function to render a modal dynamically
const showSessionExpiredModal = () => {
  const rootElement = document.createElement('div');
  document.body.appendChild(rootElement);
  const root = createRoot(rootElement);

  const handleClose = () => {
    root.unmount();
    document.body.removeChild(rootElement);
  };

  root.render(
    <Modal isOpen={true} onClose={handleClose}>
      <div className="text-center">
        <h2 className="text-xl font-bold">Session Expired</h2>
        <p className="text-gray-700 mt-2">You need to sign in again.</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            handleClose();
            localStorage.removeItem('token'); // Optional: Remove token from storage
            window.location.href = '/login'; // Redirect to the login page
          }}
        >
          Sign In
        </button>
      </div>
    </Modal>
  );
};

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to catch 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // If response is successful, return it
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle the 401 error by showing the modal
      showSessionExpiredModal();
      // Optionally, you can prevent further logging of 401 errors:
      return Promise.resolve(null); // Return a resolved promise to prevent console error logs
    }
    return Promise.reject(error); // For other errors, reject the promise
  }
);

export default axiosInstance;
