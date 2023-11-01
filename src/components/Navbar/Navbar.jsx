import React from "react";
// import logo from "./../../assets/images/logo.webp";
import profile from "./../../assets/images/profile.webp";
import notification from "./../../assets/icons/notification.webp";
import settings from "./../../assets/icons/settings.webp";
// import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const text = localStorage.getItem("token") ? "LOGOUT" : "LOGIN";

  // const navigate = useNavigate();
  // const handleLogout = () => {
  //   navigate("/login");
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  // };

  return (
    <nav className="flex pl-[30px] pr-[60px] py-[6px] items-center justify-end fixed top-0 w-full">
      <ul className="flex gap-[58px] text-primary-light items-center">
        <Link
          to="/settings"
          className="text-paragraph-1 flex items-center gap-1"
        >
          <img src={settings} alt="" />
          Settings
        </Link>
        <li className="text-paragraph-1 flex items-center gap-1 cursor-pointer">
          <img src={notification} alt="" />
          Notifications
        </li>
        <li className="text-paragraph-1">
          <Link to="/profile">
            <img src={profile} alt="profile" />
          </Link>
        </li>
      </ul>

      {/* <Button text={text} onClick={handleLogout} /> */}
    </nav>
  );
};

export default Navbar;
