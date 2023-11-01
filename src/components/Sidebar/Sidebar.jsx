import React, { useState } from "react";
import logo from "./../../assets/images/logo2.webp";
import search from "./../../assets/icons/navbar/search.webp";
// import profile from "./../../assets/icons/navbar/profile-picture.webp";
// import logout from "./../../assets/icons/navbar/logout.webp";
import NavItem from "../NavItem/NavItem";
import { navItem } from "../../constants";

const Sidebar = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    document
      .getElementById("search")
      .classList.add("bg-surface-white-surface-1");
    setHovered(true);
  };

  const handleMouseLeave = () => {
    document
      .getElementById("search")
      .classList.remove("bg-surface-white-surface-1");

    setHovered(false);
  };
  return (
    <aside
      className="fixed top-0 left-0 h-screen shadow-lg p-2 bg-white w-6 hover:w-[15%] transition-all duration-500 overflow-hidden overflow-y-auto hidden lg:flex lg:flex-col lg:justify-between z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <section>
        <img src={logo} alt="logo" id="navbarLogo" className="w-fit h-fit" />

        <div className="mt-4 flex items-center justify-center flex-col">
          <div className="relative w-full">
            <input
              type="text"
              className="border-[1px] border-surface-white-line rounded-[4px] w-full h-[40px] pl-[38px] focus-within:outline-none"
              id="search"
              placeholder="Search Here..."
            />
            <img
              src={search}
              alt=""
              className="absolute top-0 bottom-0 left-1 m-auto"
            />
          </div>
        </div>

        <div className="mt-[48px] flex flex-col">
          {navItem.map((props, key) => (
            <NavItem {...props} key={key} hovered={hovered} />
          ))}
        </div>
      </section>

      {/* <div className="mb-0 border-t-[1px] border-surface-white-line pt-[20px] flex items-center gap-1">
        <img src={profile} alt="" />
        {hovered && (
          <>
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="text-subtitle-1-bold">USER</h1>
              <p className="text-paragraph-1 text-black-tertiary">Email ID</p>
            </div>

            <img
              src={logout}
              alt=""
              className="ml-auto cursor-pointer"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.reload();
              }}
            />
          </>
        )}
      </div> */}
    </aside>
  );
};

export default Sidebar;
