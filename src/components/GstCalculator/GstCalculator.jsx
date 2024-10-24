import React, { useContext } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { PlanContext } from "../../contexts/PlanContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const GSTCalculator = ({ location }) => {
  // Extract the total price in paise from the URL
  const { planStore } = useContext(PlanContext);
  const { userData } = useContext(ProfileContext);
  const totalPriceInPaisa = parseInt(
    userData.billing_country === "India"
      ? planStore.price
      : parseFloat(location.search.split("?")[2]),
    10
  );
  // console.log(location.search.split("?")[1]);
  // Convert the total price from paise to rupees
  const totalPrice =
    userData.billing_country === "India"
      ? totalPriceInPaisa / 100
      : totalPriceInPaisa;

  // Define the GST rate
  const gstRate = 18;

  // Calculate the original price and GST amount
  const originalPrice = totalPrice / (1 + gstRate / 100);
  const gstAmount = totalPrice - originalPrice;

  return (
    <aside className="w-1/2 p-2 flex items-center">
      <span className="font-bold">
        {userData.billing_country !== "India" ? "$" : <>&#8377;</>}
        {totalPrice.toFixed(2)} (Includes{" "}
        {userData.billing_country !== "India" ? "$" : <>&#8377;</>}
        {gstAmount.toFixed(2)} 18% GST)
      </span>
    </aside>
  );
};

export default GSTCalculator;
