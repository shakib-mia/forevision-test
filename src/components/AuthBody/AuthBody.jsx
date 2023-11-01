import React from "react";
import { Link, useLocation } from "react-router-dom";
import bg from "./../../assets/images/background.webp";

const AuthBody = ({
  heading,
  altDescription,
  altText,
  altLink,
  children,
  onSubmit,
  id,
  onChange,
  className,
  closeIcon,
  handleClose,
  whiteContainerClass
}) => {
  const location = useLocation()
  return (
    // <div className="">
    <form
      onSubmit={onSubmit}
      onChange={onChange}
      className={`h-screen w-screen flex items-center justify-center bg-no-repeat bg-cover ${className}`}
      id={id}
      style={{ backgroundImage: location.pathname === '/profile' || `url(${bg})` }}
    >
      <div className={`w-1/2 shadow-xl p-2 rounded-[22px] bg-white relative ${whiteContainerClass}`}>

        {closeIcon && <button className="absolute -right-3 -top-3 text-heading-5 bg-white w-4 h-4 rounded-full flex items-center justify-center" onClick={handleClose}>&times;</button>}
        <div className="w-full flex justify-between items-center">
          <h5 className="text-heading-5-bold">{heading}</h5>
          <p className="text-paragraph-1">
            {altDescription}{" "}
            <Link
              to={altLink}
              className="text-interactive-light hover:text-interactive-light-hover"
            >
              {altText}
            </Link>
          </p>
        </div>
        {children}
      </div>
    </form>
    // </div>
  );
};

export default AuthBody;
