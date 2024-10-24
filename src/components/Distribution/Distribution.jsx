import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import InputField from "../InputField/InputField";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, config } from "../../constants";
import finishImage from "./../../assets/images/almost-done.png";
import { ProfileContext } from "../../contexts/ProfileContext";
import { ScreenContext } from "../../contexts/ScreenContext";
import GSTCalculator from "../GstCalculator/GstCalculator";
import { PlanContext } from "../../contexts/PlanContext";
import Agreement from "../Agreement/Agreement";

const Distribution = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hasCouponCode, setHasCouponCode] = useState(false);
  const [error, setError] = useState(false);
  const [discountData, setDiscountData] = useState({});
  const { userData } = useContext(ProfileContext);
  const [signature, setSignature] = useState("");
  const { formData, setScreen } = useContext(ScreenContext);
  const [orderId, setOrderId] = useState("XXXXX");
  const { planStore } = useContext(PlanContext);
  const [showAgreement, setShowAgreement] = useState(false);
  // console.log(planStore);

  // console.log();

  useEffect(() => {
    axios
      .get(backendUrl + "generate-order-id", config)
      .then(({ data }) => setOrderId(data.orderId));
  }, []);

  const [accepted, setAccepted] = useState(false);
  const discountPrice = discountData.discountPercentage
    ? (parseFloat(location.search.split("?")[2]) / 100 -
        (parseFloat(location.search.split("?")[2]) / 100) *
          (parseFloat(discountData.discountPercentage) / 100)) *
      100
    : parseFloat(location.search.split("?")[2]);

  const saved = discountData.discountPercentage
    ? (parseFloat(location.search.split("?")[2]) / 100) *
      (discountData.discountPercentage / 100)
    : 0;
  // console.log(discountData.discountPercentage);
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

  const handlePayLater = () => {
    // console.log(formData);
    formData.planName = location.search.split("?")[1];
    formData.status = "pending";
    formData.orderId = orderId;
    delete formData.file;
    console.log(formData);
    // navigate("/");
    axios
      .post(backendUrl + "upload-song/upload-song-data", formData, config)
      .then(({ data }) => {
        if (data.acknowledged) {
          toast.success("Order has been saved for later uses.");
          navigate("/");
        }
      });
  };

  // console.log(location.search.split("?")[2]);
  const handleSubmit = () => {
    const price = parseFloat(location.search.split("?")[2]) / 100;

    formData.orderId = orderId;

    // axios
    //   .post(backendUrl + "upload-song/upload-song-data", formData, config)
    //   .then(({ data }) => {
    //     if (data.acknowledged) {
    //       navigate(
    //         `/payment?price=${
    //           discountData.discountPercentage
    //             ? discountPrice
    //             : location.search.split("?")[2]
    //         }?id=${orderId}`
    //       );
    //     }
    //   });

    axios
      .post(backendUrl + "recent-uploads", formData, config)
      .then(({ data }) => {
        if (data.acknowledged && !location.search.includes("yearly-plan")) {
          // setCount(count + 1);
          // setScreen("preview");
          // : setCollapsed(true);
          navigate(
            `/payment?price=${
              discountData.discountPercentage
                ? discountPrice
                : location.search.split("?")[2]
            }?id=${orderId}`
          );
        }

        if (location.search.includes("yearly-plan")) {
          navigate("/");
        }
      });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-full lg:w-1/2">
          <img src={finishImage} className="mx-auto w-10/12" alt="" />
          <h3 className="text-heading-3 text-interactive-dark-destructive mt-2 text-center">
            You are almost done!!!
          </h3>
        </div>
        <div className="w-full lg:w-5/12 pt-5">
          <h3 className="text-heading-3-bold text-grey-dark">Order Details</h3>

          <div className="border border-[#ddd] flex flex-col divide-y divide-[#ddd] rounded mt-3 shadow-lg">
            <div className="flex divide-x divide-[#ddd] bg-grey-light">
              <aside className="w-1/2 p-2">Plan Name</aside>
              <aside className="w-1/2 p-2 capitalize">
                {planStore.planName}
              </aside>
            </div>

            <div className="flex divide-x divide-[#ddd]">
              {location.search.includes("yearly-plan") ? (
                <p className="p-2 w-full text-center">Yearly Plan</p>
              ) : (
                <>
                  <aside className="w-1/2 p-2">Price:</aside>
                  {/* <aside className="w-1/2 p-2 flex items-center">
                <FaRupeeSign className="text-subtitle-2" />{" "}
                <span className="font-bold flex items-center">
                  {location.search.split("?")[2] / 100} (Includes {"   "}
                  <FaRupeeSign /> {(location.search.split("?")[2] * 0.18) /
                    100}{" "}
                  18% GST )
                </span>
              </aside> */}
                  <GSTCalculator location={location} />
                </>
              )}
            </div>

            <div className="flex divide-x divide-[#ddd] bg-grey-light">
              <aside className="w-1/2 p-2">Order ID</aside>
              <aside className="w-1/2 p-2">{orderId}</aside>
            </div>

            <div className="flex divide-x divide-[#ddd]">
              <aside className="w-1/2 p-2">Name</aside>
              <aside className="w-1/2 p-2">
                {userData.first_name} {userData.last_name}
              </aside>
            </div>

            {/* <div className="flex divide-x divide-[#ddd] bg-grey-light">
              <aside className="w-1/2 p-2">Email ID</aside>
              <aside className="w-1/2 p-2">{userData.user_email}</aside>
            </div> */}

            {location.search.includes("social") ||
              location.search.includes("yearly-plan") || (
                <form
                  className="flex gap-2 items-end p-2"
                  onSubmit={verifyCouponCode}
                >
                  <InputField
                    hideRequired
                    fieldClassName={
                      error &&
                      "border-interactive-dark-destructive outline-interactive-dark-destructive"
                    }
                    containerClassName={"w-full"}
                    onChange={(e) => setError(false)}
                    placeholder={"Coupon Code"}
                    name={"couponCode"}
                  />
                  <Button
                    className={"!rounded-none"}
                    containerClassName={"!p-0 !border-none"}
                  >
                    Apply
                  </Button>
                </form>
              )}

            {location.search.includes("social") ||
              (discountData.discountPercentage && (
                <>
                  <div className="flex divide-x divide-[#ddd]">
                    <aside className="w-1/2 p-2">Discount</aside>
                    <aside className="w-1/2 p-2">
                      {discountData.discountPercentage
                        ? discountData.discountPercentage + "%"
                        : "N/A"}
                    </aside>
                  </div>

                  <div className="flex divide-x divide-[#ddd] bg-grey-light">
                    <aside className="w-1/2 p-2">Save</aside>
                    <aside className="w-1/2 p-2 flex font-bold items-center">
                      <FaRupeeSign className="text-subtitle-2" />
                      {saved}
                    </aside>
                  </div>

                  <div className="flex divide-x divide-[#ddd]">
                    <aside className="w-1/2 p-2">Price After Discount</aside>
                    <aside className="w-1/2 p-2 flex items-center">
                      <FaRupeeSign className="text-subtitle-2" />{" "}
                      <span className="font-bold">{discountPrice / 100}</span>
                    </aside>
                  </div>

                  {/* <div className="flex divide-x divide-[#ddd] bg-grey-light">
                  <aside className="w-1/2 p-2">Plan Name</aside>
                  <aside className="w-1/2 p-2">
                    {location.search.split("?")[1]}
                  </aside>
                </div> */}
                </>
              ))}
          </div>

          {/* <label className="flex items-center gap-1 justify-end mt-3 uppercase cursor-pointer">
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={(e) => setHasCouponCode(e.target.checked)}
            />
            <span>I have a Coupon Code</span>
          </label> */}

          <div className="w-1/2 mt-5 ml-auto text-center">
            <textarea
              // name=""
              onChange={(e) => {
                setSignature(e.target.value);
                formData.signature = e.target.value;
              }}
              placeholder="Sign Here..."
              className="border-b resize-none text-heading-5 w-full focus:outline-none signature placeholder:font-sans text-center pb-3"
              // id=""
              // cols="1"
              rows="1"
            ></textarea>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => {
                  setAccepted(e.target.checked);
                  formData.accepted = e.target.checked;
                  setShowAgreement(true);
                }}
              />{" "}
              I Accept the{" "}
              <Link
                className="text-interactive-light font-medium hover:text-interactive-dark-hover active:text-interactive-light-active focus:text-interactive-light-focus"
                to="/terms-and-conditions"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                Terms and Conditions
              </Link>
            </label>
          </div>

          <div className="flex gap-2 justify-center">
            {location.search.includes("yearly-plan") ? (
              <Button
                type={"button"}
                onClick={handleSubmit}
                containerClassName={"mt-4"}
                disabled={!accepted || !signature.length}
              >
                Submit
              </Button>
            ) : (
              <Button
                type={"button"}
                onClick={handleSubmit}
                containerClassName={"mt-4"}
                disabled={!accepted || !signature.length}
              >
                Proceed to Checkout
              </Button>
            )}
            <Button
              type={"button"}
              onClick={handlePayLater}
              containerClassName={"mt-4"}
              disabled={!accepted || !signature.length}
            >
              Save As Draft
            </Button>
          </div>

          {/* <Button>Submit</Button> */}
        </div>
      </div>

      {showAgreement ? (
        <Agreement
          formData={formData}
          handleClose={() => setShowAgreement(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Distribution;
