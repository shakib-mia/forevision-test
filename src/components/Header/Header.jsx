import React from "react";
import resso from "./../../assets/icons/resso.webp";

const Header = ({ header, subheader }) => {
  return (
    <header className="pt-[67px]">
      <div className="flex justify-center items-center mb-[14px] gap-1">
        {header === "Resso Profile Verification" && (
          <img className="w-5 h-5" src={resso} alt="" />
        )}
        <h1 className="text-center text-primary text-heading-3">{header}</h1>
      </div>
      {/* <hr className="mx-[333px] border-secondary-light border-[1px]" /> */}

      <h5 className="text-primary-light text-center text-paragraph-1">
        {subheader}
      </h5>

      {/* <hr className="mx-[459px] border-secondary-light border-[1px]" /> */}
    </header>
  );
};

export default Header;
