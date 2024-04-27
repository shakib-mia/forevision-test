import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-20 flex justify-center items-center">
      {children}
    </div>
  );
};

export default Modal;
