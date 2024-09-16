import React from "react";

const Modal = ({ children, handleClose, className }) => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-20 flex justify-center items-center"
      onClick={handleClose}
    >
      <div
        className="w-4/6 mx-auto bg-white p-3 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
