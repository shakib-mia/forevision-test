import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { GrAnnounce } from "react-icons/gr";
import caution from "./../../assets/icons/caution.svg";

const LoginMessage = () => {
  return (
    <div className="fixed left-0 top-0 backdrop-blur w-screen h-screen flex justify-center items-center">
      <div className="w-11/12 xl:w-1/2 bg-white p-5 rounded shadow-xl flex flex-col justify-center items-center gap-2">
        <GrAnnounce className="text-heading-1-bold" />

        <p className="w-full xl:w-9/12 mx-auto text-center text-paragraph-1 text-grey-dark flex">
          Thank you for being a part of our journey! We’re constantly working to
          provide you with the best experience. However, if you face any issues
          while using our application, please don’t hesitate to let us know.{" "}
        </p>
        <CountdownCircleTimer
          isPlaying
          duration={5}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          strokeWidth={8}
          size={100}
        >
          {({ remainingTime }) => (
            <span className="text-heading-4-bold text-grey-dark">
              {remainingTime}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default LoginMessage;
