import React from "react";
import { navPhone } from "../../constants";
// import { nav } from "../../constants";
import more from './../../assets/icons/more.webp'
import { NavLink } from "react-router-dom";

const BottomBar = () => {
  // alert(navPhone.length)
  return (
    <nav className="fixed bottom-0 z-[99999] px-1 shadow w-screen bg-white flex justify-center lg:hidden" id="bottomBar">
      {navPhone.slice(0, navPhone.length).map(({ icon, text, path }, key) => (
        <NavLink to={path} className="w-1/5 flex justify-center flex-col items-center px-1 py-1 gap-[4px]" key={key}>
          {icon}
          <h2 className="text-paragraph-2">{text}</h2>
        </NavLink>
      ))}

      <div className="w-1/5 flex justify-center flex-col items-center px-1 gap-[4px]">
        <img src={more} className="w-3 h-3" alt={'text'} key={'key'} />
        <h2 className="text-paragraph-2">{'More'}</h2>
      </div>
    </nav>
  );
};

export default BottomBar;
