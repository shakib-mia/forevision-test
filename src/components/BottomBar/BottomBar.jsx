import React, { useContext } from "react";
import { navPhone } from "../../constants";
// import { nav } from "../../constants";
import logout from "./../../assets/icons/navbar/logout.webp";
import { NavLink, useNavigate } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";

const BottomBar = () => {
  const { setProfileData, setToken } = useContext(ProfileContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setProfileData({});
    setToken("");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className="fixed bottom-0 z-[99999] px-1 shadow w-screen bg-white flex justify-center xl:hidden"
      id="bottomBar"
    >
      {navPhone.slice(0, navPhone.length).map(({ icon, text, path }, key) => (
        <NavLink
          to={path}
          className="w-1/5 flex justify-center flex-col items-center px-1 py-1 gap-[4px]"
          key={key}
        >
          {icon}
          <h2 className="text-paragraph-2">{text}</h2>
        </NavLink>
      ))}

      <div
        className="w-1/5 flex justify-center flex-col items-center px-1 gap-[4px] cursor-pointer"
        onClick={handleLogout}
      >
        <img src={logout} className="w-2 h-2" alt={"text"} key={"key"} />
        <h2 className="text-paragraph-2">{"Logout"}</h2>
      </div>
    </nav>
  );
};

export default BottomBar;
