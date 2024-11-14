import React, { useContext } from "react";
import balanceBG from "../../assets/images/balance-bg.svg";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const AccountBalance = () => {
  const { userData, foundRequested, dollarRate } = useContext(ProfileContext);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`w-full ml-0 2xl:w-full h-full lg:h-[1000px] 2xl:h-full flex flex-col justify-between ${
        location.pathname === "/" || location.pathname === "/home"
          ? "bg-grey-light"
          : "bg-grey-light lg:bg-white"
      } rounded-[32px] relative py-5 px-5 2xl:px-[38px] 2xl:py-[50px] bg-[size:110%_34%] bg-[-36px_-26px] bg-no-repeat`}
      // style={{ backgroundImage: `url(${balanceBG})` }}
    >
      <img
        src={balanceBG}
        className="z-0 absolute top-0 left-0 w-full h-fit"
        alt=""
      />
      <aside>
        {/* <img
            src={balanceBG}
            className="absolute w-full h-auto left-0 top-0 z-0"
            alt=""
          /> */}
        <h4 className="text-heading-4-bold text-white 2xl:text-grey relative">
          Account <br className="2xl:hidden" /> Balance
        </h4>
        <h4 className="text-heading-4-bold text-grey mt-5 flex items-center gap-2 relative">
          {!userData.lifetimeRevenue && !userData.lifetimeDisbursed ? (
            // Fancy "Nothing to show" message when no data is available
            <span className="text-grey italic">Nothing to show</span>
          ) : (
            <>
              {isNaN(
                userData.lifetimeRevenue - (userData.lifetimeDisbursed || 0)
              ) || userData.billing_country === "India" ? (
                <>&#8377;</>
              ) : (
                "$"
              )}{" "}
              {isNaN(
                userData.lifetimeRevenue - (userData.lifetimeDisbursed || 0)
              )
                ? "Loading..."
                : userData.billing_country === "India"
                ? (
                    userData.lifetimeRevenue - (userData.lifetimeDisbursed || 0)
                  ).toFixed(2)
                : (
                    (userData.lifetimeRevenue.toFixed(2) -
                      (userData.lifetimeDisbursed
                        ? userData.lifetimeDisbursed.toFixed()
                        : 0)) *
                    dollarRate
                  ).toFixed(2)}
            </>
          )}
        </h4>
      </aside>

      <div className="flex justify-center">
        <Button
          onClick={() => navigate("/revenue-form")}
          disabled={
            (
              userData.lifetimeRevenue - (userData.lifetimeDisbursed || 0)
            ).toFixed(2) < 1000 ||
            (foundRequested !== null && foundRequested._id)
          }
          text={"Request Withdraw"}
        ></Button>
      </div>
    </div>
  );
};

export default AccountBalance;
