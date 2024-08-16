import React, { useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaMusic } from "react-icons/fa";
import { CiStreamOn } from "react-icons/ci";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { PlanContext } from "../../contexts/PlanContext";
import Swal from "sweetalert2";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import { BsSendArrowUp } from "react-icons/bs";
import { TbCopyrightOff, TbMusicOff } from "react-icons/tb";

const RecentUploadsItem = (props) => {
  //   console.log(props);
  const navigate = useNavigate();
  const {
    songName,
    orderId,
    _id,
    payment_id,
    price,
    requested,
    setUpdate,
    update,
    status,
  } = props;
  // console.log(props);
  const { token } = useContext(ProfileContext);
  const [reason, setReason] = useState("");

  const handleRefundRequest = () => {
    const updated = { ...props };
    delete updated.update;
    updated.reason = reason;
    console.log(updated);
    // // console.log(updated);
    // axios.post(backendUrl + "refund", updated, config).then(({ data }) => {
    //   // if()
    //   setUpdate(!update);
    // });
  };

  const handleReason = async () => {
    const { value: reasonValue } = await Swal.fire({
      title: "Refund",
      input: "select",
      inputOptions: {
        "Reason 1": "Reason 1",
        "Reason 2": "Reason 2",
        "Reason 3": "Reason 3",
        "Reason 4": "Reason 4",
      },
      inputLabel: "Reason for Refund",
      inputPlaceholder: "Enter Refund Reason",
      confirmButtonText: "Submit",
      confirmButtonColor: "#22683E",
      inputAttributes: {
        id: "myInput",
      },
      // customButton2: "Submit",
    });

    setReason(reasonValue);
    // console.log(reason);
  };

  useEffect(() => {
    if (reason.length > 0) {
      const updated = { ...props };
      updated.reason = reason;
      delete updated.update;
      delete updated.setUpdate;
      // const isrcs = userData?.isrc?.split(",");
      const config = {
        headers: {
          token: sessionStorage.getItem("token") || token,
        },
      };

      // console.log(updated);
      axios.post(backendUrl + "refund", updated, config).then(({ data }) => {
        // if()
        setUpdate(!update);
      });
    }
  }, [reason]);

  return (
    <div className="grid grid-cols-3 items-center text-center">
      <div className="flex gap-1 items-center">
        <FaMusic />
        <div>{songName}</div>
      </div>
      {payment_id ? (
        <p
          className="text-subtitle-1 flex gap-1 items-center justify-center capitalize w-full"
          title={payment_id}
        >
          <span
            className={
              status === "streaming"
                ? "text-interactive-light"
                : status === "paid"
                ? "text-interactive-light-confirmation-focus"
                : status === "sent-to-stores"
                ? "text-interactive-light-confirmation"
                : status === "copyright-infringed"
                ? "text-interactive-light-destructive"
                : status === "taken-down"
                ? "text-interactive-dark-destructive"
                : ""
            }
          >
            {status}
          </span>
          {status === "paid" ? (
            <FaCheckCircle className="text-interactive-light-confirmation-focus" />
          ) : status === "Sent to Stores" ? (
            <BsSendArrowUp className="text-interactive-light-confirmation" />
          ) : status === "streaming" ? (
            <CiStreamOn className="text-interactive-light w-3 h-3" />
          ) : status === "copyright-infringed" ? (
            <TbCopyrightOff className="text-interactive-light-destructive w-3 h-3" />
          ) : status === "taken-down" ? (
            <TbMusicOff className="text-interactive-dark-destructive w-3 h-3" />
          ) : (
            <></>
          )}
        </p>
      ) : (
        <Button
          containerClassName={"mx-auto"}
          small={true}
          disabled={price === "0"}
          onClick={() => {
            price > 0 && navigate(`/payment?price=${price}?id=${_id}`);
            // setPlanStore({ planName, price });
          }}
        >
          Pay Now
        </Button>
      )}

      {status === "taken-down" || status === "copyright-infringed" ? (
        <></>
      ) : (
        <Button
          containerClassName={
            "mx-auto focus:border-interactive-light-destructive-focus"
          }
          disabled={requested}
          small={true}
          onClick={handleReason}
          // containerClassName=''
          className={
            "bg-interactive-light-destructive hover:!bg-interactive-light-destructive-hover focus:!bg-interactive-light-destructive-focus active:!bg-interactive-light-destructive-active disabled:hover:!bg-interactive-light-destructive-disabled disabled:!bg-interactive-light-destructive-disabled"
          }
          type={"destructive"}
        >
          Refund
        </Button>
      )}
    </div>
  );
};

export default RecentUploadsItem;
