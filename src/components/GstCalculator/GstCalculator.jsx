import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const GSTCalculator = ({ location }) => {
  // Extract the total price in paise from the URL
  const totalPriceInPaise = parseInt(location.search.split("?")[2], 10);

  // Convert the total price from paise to rupees
  const totalPrice = totalPriceInPaise / 100;

  // Define the GST rate
  const gstRate = 18;

  // Calculate the original price and GST amount
  const originalPrice = totalPrice / (1 + gstRate / 100);
  const gstAmount = totalPrice - originalPrice;

  return (
    <aside className="w-1/2 p-2 flex items-center">
      <span className="font-bold">
        &#8377; {totalPrice.toFixed(2)} (Includes &#8377; {gstAmount.toFixed(2)}{" "}
        18% GST)
      </span>
    </aside>
  );
};

export default GSTCalculator;
