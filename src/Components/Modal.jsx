import React from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow text-black relative w-[90%] max-w-md">
        {/* Cross button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h1 className="text-xl font-bold mb-4">Modal</h1>
        <p>This is the content of the modal. You can put anything here.</p>
      </div>
    </div>
  );
};

export default Modal;
