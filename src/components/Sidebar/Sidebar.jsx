import React, { useContext, useState } from "react";
import logo from "./../../assets/images/logo2.webp";
// import search from "./../../assets/icons/navbar/search.webp";
import logout from "./../../assets/icons/navbar/logout.webp";
import NavItem from "../NavItem/NavItem";
import { imageDomain, navItem } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [hovered, setHovered] = useState(false);
  const { setProfileData, userData } = useContext(ProfileContext);
  // console.log(userData);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    // document
    //   .getElementById("search")
    //   .classList.add("bg-surface-white-surface-1");
    setHovered(true);
  };

  const handleMouseLeave = () => {
    // document
    //   .getElementById("search")
    //   .classList.remove("bg-surface-white-surface-1");

    setHovered(false);
  };

  const handleLogout = () => {
    setProfileData({});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  // console.log(userData);

  return (
    <aside
      className="fixed top-0 left-0 h-screen shadow-lg p-2 bg-white w-6 hover:w-[15%] transition-all duration-500 overflow-hidden overflow-y-auto hidden lg:flex lg:flex-col lg:justify-between z-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <section>
        <img src={logo} alt="logo" id="navbarLogo" className="w-fit h-fit" />

        {/* <div className="mt-4 flex items-center justify-center flex-col">
          <div className="relative w-full">
            <input
              type="text"
              className="border-[1px] border-surface-white-line rounded-[4px] w-full h-[40px] pl-[38px] focus-within:outline-none"
              id="search"
              name="search"
              placeholder="Search Here..."
            />
            <img
              src={search}
              alt=""
              className="absolute top-0 bottom-0 left-1 m-auto"
            />
          </div>
        </div> */}

        <div className="mt-[48px] flex flex-col gap-2 whitespace-nowrap">
          {navItem.map((props, key) => (
            <NavItem {...props} key={key} hovered={hovered} />
          ))}
        </div>
      </section>

      <div className="mb-0 border-t-[1px] border-surface-white-line pt-[20px] flex items-center gap-1">
        <img
          src={
            userData?.display_image ? imageDomain + userData?.display_image : ""
          }
          className="rounded-full w-[40px] h-[40px]"
          alt="profile"
        />
        {hovered && (
          <>
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="text-subtitle-1-bold">
                {userData?.partner_name ||
                  userData?.first_name + " " + userData?.last_name}
              </h1>
              <p className="text-button text-black-tertiary">
                {userData?.user_email || userData?.emailId}
              </p>
            </div>

            <img
              src={logout}
              alt=""
              className="ml-auto cursor-pointer w-2 h-2"
              onClick={handleLogout}
            />
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
