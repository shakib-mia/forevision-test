import React from "react";
import bg from "./../../assets/images/dashboard-bg.webp";

const Home = () => {
  return (
    <div
      className="h-screen w-screen bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    ></div>
  );
};

export default Home;
