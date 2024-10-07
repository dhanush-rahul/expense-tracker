import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const FloatingButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Extra Round Floating Button */}
      <button
        onClick={toggleDropdown}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 p-5 rounded-full shadow-lg text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none transition-all transform hover:scale-110 w-16 h-16 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faEllipsisV} size="lg" />
      </button>

      {/* Dropdown Menu (appears above the button) */}
      {isDropdownOpen && (
        <div className="absolute bottom-20 right-0 w-36 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-slide-up">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
