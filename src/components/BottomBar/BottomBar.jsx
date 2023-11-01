import React from "react";
import { navItem } from "../../constants";

const BottomBar = () => {
  return (
    <nav className="fixed bottom-0 shadow w-screen py-3 bg-white flex justify-center gap-3 lg:hidden">
      {navItem.slice(0, navItem.length - 1).map(({ icon, text }, key) => (
        <img src={icon} alt={text} key={key} />
      ))}
    </nav>
  );
};

export default BottomBar;
