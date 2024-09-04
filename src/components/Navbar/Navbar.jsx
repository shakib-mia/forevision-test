import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import logo from "./../../assets/images/logo2.webp";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex pl-2 px-1 py-2 lg:pr-[60px] lg:py-[12px] items-center justify-between fixed top-0 w-full bg-[#000] z-[9999] shadow-lg">
      <Link className="inline-block w-7 lg:w-2/12" to={"/"}>
        <img src={logo} alt="logo" id="navbarLogo" className="lg:w-1/2 h-fit" />
      </Link>
      <ul className="flex gap-[58px] text-white items-center">
        {/* <Link
          to="/settings"
          className="text-paragraph-1 flex items-center gap-1"
        >
          <IoSettingsOutline />
          Settings
        </Link> */}
        {/* <li className="text-paragraph-1 flex items-center gap-1 cursor-pointer">
          <img src={notification} alt="" />
          Notifications
        </li> */}
        <li className="text-paragraph-1">
          <Link to="/profile">
            {/* <img src={profile} alt="profile" /> */}
            <CgProfile className="text-heading-6" />
          </Link>
        </li>
      </ul>

      {/* <Button text={text} onClick={handleLogout} /> */}
    </nav>
  );
};

export default Navbar;
