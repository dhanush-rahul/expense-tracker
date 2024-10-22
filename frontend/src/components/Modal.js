import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  const handleBackgroundClick = (e) => {
    // Close modal if the click happens outside the modal content (child element)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
    onClick={handleBackgroundClick}>
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative text-white">
      <button
        className="absolute top-2 right-2 text-gray-300 hover:text-gray-500"
        onClick={onClose}
      >
        &times; {/* Close button */}
      </button>
      {children}
    </div>
  </div>
  );
};

export default Modal;
