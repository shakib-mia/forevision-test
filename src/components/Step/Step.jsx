import React from "react";

const Step = ({ step, details }) => {
  return (
    <div className="p-2 shadow-lg rounded-md hover:shadow-md transition duration-300 text-grey-dark flex flex-col items-center group cursor-grab">
      <h6 className="text-heading-6-bold mb-1 inline-block mx-auto items-center text-center">
        {step}
        <div className="w-full h-[2px] bg-interactive-light-confirmation-focus duration-300 transition-[box-shadow] group-hover:shadow-[0_0_4px_0_#2E844A] mt-1"></div>
      </h6>

      <p className="text-center">{details}</p>
    </div>
  );
};

export default Step;
