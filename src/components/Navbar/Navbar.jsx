import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="hidden xl:flex pl-[30px] pr-[60px] py-2 items-center justify-end fixed top-0 w-full bg-[#000] z-[99] shadow-lg">
      <ul className="flex gap-[58px] text-white items-center">
        <Link
          to="/settings"
          className="text-paragraph-1 flex items-center gap-1"
        >
          {/* <img src={settings} alt="" /> */}
          <IoSettingsOutline />
          Settings
        </Link>
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
