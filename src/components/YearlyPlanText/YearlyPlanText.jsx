import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import { PlanContext } from "../../contexts/PlanContext";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import logo from "../../assets/icons/logo.PNG";
import useRazorpay from "react-razorpay";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import { FaCheck } from "react-icons/fa";

const YearlyPlanText = () => {
  const { userData, token, dollarRate, setToken } = useContext(ProfileContext);
  const [orderId, setOrderId] = useState("XXXXX");
  const location = useLocation();
  const navigate = useNavigate();
  const { setPlanStore, planStore } = useContext(PlanContext);
  const [Razorpay] = useRazorpay();
  console.clear();
  console.log(dollarRate);
  const config = {
    headers: {
      token,
    },
  };

  // Memoized price calculation
  const calculatePrice = useMemo(
    () => (price) => {
      if (!price) return "Free";

      const isIndian =
        userData.billing_country === "India" ||
        !userData ||
        !userData.billing_country;
      const currency = isIndian ? "₹" : "$";
      const amount = isIndian
        ? price / 100
        : ((price * dollarRate * 1.5) / 100).toFixed(2);

      return `${currency}${amount}`;
    },
    [userData.billing_country, dollarRate]
  );

  useEffect(() => {
    axios
      .get(backendUrl + "generate-order-id", config)
      .then(({ data }) => setOrderId(data.orderId));
  }, []);

  const handleRazorpayPayment = async (formData) => {
    // console.log();

    axios
      .post(
        backendUrl + "razorpay",
        {
          amount:
            userData.billing_country === "India"
              ? parseFloat(429900)
              : parseInt(429900 * dollarRate),
          currency: userData.billing_country === "India" ? "INR" : "USD",
        },
        config
      ) // ============  *** Need to set amount dynamically here ***  ================
      .then(({ data }) => initPayment(data, formData))
      .catch((error) => {
        toast.error(error.response.data);
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };
  // console.log(location);
  const initPayment = (data, formData) => {
    const options = {
      // key: "rzp_live_hbtXvHKqIxw2XQ",
      key: "rzp_test_VWlIF0sBVpBClm",
      amount:
        userData.billing_country === "India"
          ? parseFloat(429900)
          : parseInt(429900 * dollarRate),
      // currency: data.currency,
      name: data.name,
      currency: userData.billing_country === "India" ? "INR" : "USD",
      description: "Test",
      image: logo,
      order_id: data.id,
      handler: async (response) => {
        // response.songId =
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const verifyUrl = backendUrl + "razorpay/verify/yearly";

          // console.log(config);
          const res = await axios.post(
            verifyUrl,
            {
              ...response,
              price:
                userData.billing_country === "India"
                  ? parseFloat(429900)
                  : parseInt(429900 * dollarRate),
            },
            config
          );

          if (res.data.razorpay_order_id.length) {
            const planData = {
              planName: "ForeVision Digital Yearly Plan",
              price:
                userData.billing_country === "India"
                  ? parseFloat(429900)
                  : parseInt(429900 * dollarRate),
              order_id: orderId,
              payment_id: razorpay_payment_id,
            };
            setPlanStore((prev) => planData);

            axios
              .post(backendUrl + "yearly-plans", planData, {
                headers: { token },
              })
              .then(({ data }) => {
                if (data.acknowledged) {
                  // e.target.reset();
                  navigate("/payment-success");

                  toast.success("Yearly Plan Activated");
                }
              });
          }
          // res;
        } catch (error) {
          // console.log(error);
          setToken("");
          toast.error(error.response.data, { position: "bottom-center" });
        }
      },
      theme: {
        color: "#064088",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const planData = {};

    // fields.map((item) => (planData[item.name] = e.target[item.name].value));
    handleRazorpayPayment(planData);

    // console.log(planData);

    // console.log(planData);
  };

  return (
    <div className="relative bg-interactive-light text-white p-4">
      <div className="sticky top-0 left-0 py-4">
        <h3 className="text-heading-4-bold xl:text-[55px] text-white text-center xl:text-left">
          ForeVision Digital
        </h3>

        <h1 className="text-heading-5-bold xl:text-heading-1-bold text-white text-center xl:text-left">
          Yearly Plan
        </h1>

        <h5 className="text-heading-6 text-center xl:text-left mt-3 xl:text-heading-5-bold">
          Unlock Unlimited Potential with Our Yearly Plan
        </h5>
        <h5 className="text-heading-5-bold text-grey-light mt-2">
          {calculatePrice(249900)}
        </h5>
      </div>
      <p className="font-bold">What’s Included in the Yearly Plan?</p>
      <ul className="flex flex-col gap-1 mt-4">
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="font-semibold">
            Unlimited Audios all over the year
            {/* Unlimited song under 1 (one) UPC */}
          </aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">
            All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn
          </aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">
            Caller Tunes On JIO, Vi, BSNL, Airtel
          </aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Your Music Will Be Live Everywhere</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Caller Tune Facility</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">All International Apps Covered</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Upload Music In Specific Stores</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Get 90% Lifetime Royalties</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Schedule Your Own Release Date</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Free Custom Label</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">100% Copyright Will Be Yours</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">YouTube Content ID & YouTube Music</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">ForeVision Dashboard</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Lifetime Support</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">
            Get Your Music In Facebook & Instagram
          </aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Earn With Facebook And Instagram</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Song Migration Accepted</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Previously Released Songs Accepted</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">
            Quarterly Report Directly On Dashboard
          </aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Approval Within 3-4 Hrs</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Availability Lifetime</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Zero Yearly Fee</aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">
            Including ForeVision Special Service
          </aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">
            Get Lyrics In Facebook, Instagram, Spotify, JioSaavn, Google & More
          </aside>
        </li>
        <li className="flex gap-2 text-paragraph-1 items-center">
          <FaCheck className="w-1/12" />
          <aside className="w-11/12">Platform Playlist Pitch</aside>
        </li>
      </ul>

      <Button
        className={
          "bg-white w-full !text-interactive-light hover:!bg-surface-white-line focus:!bg-surface-white-line justify-center"
        }
        containerClassName={"mt-7"}
        onClick={handleSubmit}
      >
        Get started
      </Button>
    </div>
  );
};

export default YearlyPlanText;
