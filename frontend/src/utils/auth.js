export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;  // If token exists, return true, else return false
  };