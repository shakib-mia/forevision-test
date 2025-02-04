import React from "react";

const Modal = ({ children, handleClose, className, whiteContainerClass }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-[99999999999999] flex justify-center items-center ${className}`}
      onClick={handleClose}
    >
      <div
        className={`lg:w-4/6 mx-auto bg-white p-1 lg:p-3 rounded-md ${whiteContainerClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
