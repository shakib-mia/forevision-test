import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import caution from "./../../assets/icons/caution.svg";

const LoginMessage = () => {
  return (
    <div className="fixed left-0 top-0 backdrop-blur w-screen h-screen flex justify-center items-center">
      <div className="w-11/12 xl:w-1/2 bg-white p-5 rounded shadow-xl flex flex-col justify-center items-center gap-2">
        {/* <img src={caution} className="w-1/3" alt="caution" />
        <p className="text-interactive-light-destructive-focus text-heading-6 text-center justify-center items-center">
          {" "}
          It may Take upto <b>Ten(10)</b> minutes to load your data. Be Patient.
        </p> */}
        <p className="w-full xl:w-9/12 mx-auto text-center text-paragraph-1 text-grey-dark flex">
          Thank you for being a part of our journey! We’re constantly working to
          provide you with the best experience. However, if you face any issues
          while using our application, please don’t hesitate to let us know.{" "}
        </p>

        <CountdownCircleTimer
          isPlaying
          duration={10}
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
