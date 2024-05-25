import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Distribution = () => {
  return (
    <div>
      <h3 className="text-heading-3-bold text-grey-dark">Distributions</h3>

      <div className="w-1/4 ml-auto text-center">
        <textarea
          // name=""
          placeholder="Sign Here..."
          className="border-b resize-none text-heading-1 w-full focus:outline-none signature placeholder:font-sans text-center pb-3"
          // id=""
          // cols="1"
          rows="1"
        ></textarea>
        <label className="cursor-pointer">
          <input type="checkbox" /> I Accept the{" "}
          <Link
            className="text-interactive-light font-medium hover:text-interactive-dark-hover active:text-interactive-light-active focus:text-interactive-light-focus"
            to="/terms-and-conditions"
          >
            Terms and Conditions
          </Link>
        </label>
      </div>

      <Button>Submit</Button>
    </div>
  );
};

export default Distribution;
