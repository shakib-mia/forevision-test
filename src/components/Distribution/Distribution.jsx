import React, { useState } from "react";
import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import InputField from "../InputField/InputField";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";

const Distribution = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hasCouponCode, setHasCouponCode] = useState(false);
  const [error, setError] = useState(false);
  const [discountData, setDiscountData] = useState({});

  // console.log(location.search.split("?"));

  const verifyCouponCode = (e) => {
    e.preventDefault();

    axios
      .get(backendUrl + `coupon-codes/${e.target.couponCode.value}`)
      .then(({ data }) => setDiscountData(data))
      .catch((error) => {
        setError(true);
        setDiscountData({});
        toast.error(error.response.data.message, {
          position: "bottom-center",
        });
      });
  };

  return (
    <div>
      <h3 className="text-heading-3-bold text-grey-dark">Distributions</h3>

      <label className="flex items-center gap-1 justify-end">
        <input
          type="checkbox"
          onChange={(e) => setHasCouponCode(e.target.checked)}
        />
        <span>I've a Coupon Code</span>
      </label>

      {hasCouponCode && (
        <form className="flex gap-2 items-end" onSubmit={verifyCouponCode}>
          <InputField
            hideRequired
            fieldClassName={
              error &&
              "border-interactive-dark-destructive outline-interactive-dark-destructive"
            }
            containerClassName={"w-1/4"}
            onChange={(e) => setError(false)}
            label={"Coupon Code"}
            name={"couponCode"}
          />
          <Button>Apply</Button>
        </form>
      )}

      <div className="border border-[#ddd] flex flex-col divide-y divide-[#ddd] rounded mt-3">
        <div className="flex divide-x divide-[#ddd] bg-grey-light">
          <aside className="w-1/2 p-2">Plan Name</aside>
          <aside className="w-1/2 p-2">{location.search.split("?")[1]}</aside>
        </div>

        <div className="flex divide-x divide-[#ddd]">
          <aside className="w-1/2 p-2">Price:</aside>
          <aside className="w-1/2 p-2 flex items-center">
            <FaRupeeSign className="text-subtitle-2" />{" "}
            <span className="font-bold">
              {location.search.split("?")[2] / 100}
            </span>
          </aside>
        </div>

        <div className="flex divide-x divide-[#ddd] bg-grey-light">
          <aside className="w-1/2 p-2">Order ID</aside>
          <aside className="w-1/2 p-2">{location.search.split("?")[1]}</aside>
        </div>

        {Object.keys(discountData).length > 0 && (
          <>
            <div className="flex divide-x divide-[#ddd]">
              <aside className="w-1/2 p-2">Discount</aside>
              <aside className="w-1/2 p-2">
                {discountData.discountPercentage}%
              </aside>
            </div>

            <div className="flex divide-x divide-[#ddd] bg-grey-light">
              <aside className="w-1/2 p-2">Price After Discount</aside>
              <aside className="w-1/2 p-2">
                {parseFloat(location.search.split("?")[2]) / 100 -
                  (parseFloat(location.search.split("?")[2]) / 100) *
                    (parseFloat(discountData.discountPercentage) / 100)}
              </aside>
            </div>

            <div className="flex divide-x divide-[#ddd]">
              <aside className="w-1/2 p-2">Plan Name</aside>
              <aside className="w-1/2 p-2">
                {location.search.split("?")[1]}
              </aside>
            </div>
          </>
        )}
      </div>

      <Button
        type={"button"}
        onClick={() =>
          navigate(`/payment?price=${location.search.split("?")[2]}`)
        }
        containerClassName={"mt-3 w-fit mx-auto"}
      >
        Proceed to Checkout
      </Button>

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

      {/* <Button>Submit</Button> */}
    </div>
  );
};

export default Distribution;
