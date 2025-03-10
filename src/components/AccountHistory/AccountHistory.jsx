import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import { backendUrl } from "../../constants";

const AccountHistory = () => {
  const [history, setHistory] = useState([]);
  const { token } = useContext(ProfileContext);

  useEffect(() => {
    axios
      .get(backendUrl + "account-history", {
        headers: { token },
      })
      .then(({ data }) => {
        // console.clear();
        setHistory(data);
      });
  }, []);

  return (
    <div className="w-full 2xl:w-1/2 bg-grey-light rounded-2xl p-4 h-[392px] overflow-y-auto">
      <h4 className="text-heading-6-bold 2xl:text-heading-4-bold mb-3">
        Account History
      </h4>

      <div className="grid grid-cols-3 text-center py-2">
        <p>Date</p>
        <p>Amount</p>
        <p>Status</p>
        {/* <p></p> */}
      </div>

      {history.map(
        ({ paymentDate, totalAmount, status, declined, disbursed, _id }) => (
          <div className="grid grid-cols-3 text-center py-1" key={_id}>
            <p>{paymentDate}</p>
            <p>{totalAmount}</p>
            <p
              className={
                declined
                  ? "text-interactive-light-destructive-focus"
                  : disbursed
                  ? "text-interactive-light-confirmation-focus"
                  : "text-interactive-light"
              }
            >
              {declined ? "Declined" : disbursed ? "Disbursed" : "Pending"}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default AccountHistory;
