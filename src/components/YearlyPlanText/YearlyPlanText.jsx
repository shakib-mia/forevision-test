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
  const [loading, setLoading] = useState(false);
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
                  setLoading(false);
                  navigate("/payment-success");

                  toast.success("Yearly Plan Activated");
                }
              });
          }
          // res;
        } catch (error) {
          // console.log(error);
          setToken("");
          setLoading(false);
          toast.error(error.response.data, { position: "bottom-center" });
        }
      },
      theme: {
        color: "#064088",
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const planData = {};
    setLoading(true);

    // fields.map((item) => (planData[item.name] = e.target[item.name].value));
    handleRazorpayPayment(planData);

    // console.log(planData);

    // console.log(planData);
  };

  return (
    <div className="relative bg-interactive-light selection:bg-white selection:text-interactive-light text-white p-4">
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
          {calculatePrice(429900)}
        </h5>
      </div>
      <h6 className="text-heading-6-bold mb-1">
        Why Choose ForeVision Digital?
      </h6>
      <p>
        ForeVision Digital is India’s largest music distribution service
        provider, offering seamless distribution, automated royalty management,
        and exclusive caller tune services—all at an affordable yearly cost.
      </p>

      <h6 className="text-heading-6-bold mb-1 mt-4">
        Plan Features & Benefits:
      </h6>
      <ol type="1" className="flex flex-col gap-1 list-decimal ml-3">
        <li className="text-paragraph-1">
          Unlimited Audios all over the year
          <ul className="list-disc ml-2">
            <li>
              Get your music released on major platforms like Spotify, Apple
              Music, JioSaavn, Wynk, Gaana, Amazon Music, YouTube Music,
              Boomplay, and more.
            </li>
            <li>
              Global reach, ensuring your music is accessible to audiences
              worldwide.
            </li>
            <li>
              Fast processing and delivery for a hassle-free release experience.
            </li>
          </ul>
        </li>
        <li className="text-paragraph-1">
          Caller Tune (CRBT) Services
          <ul className="list-disc ml-2">
            <li>
              Set your song as a caller tune on all major telecom operators.
            </li>
            <li>Available under ForeVision CRBT, CRBT+, and Album+ plans.</li>
            <li>Receive unique CRBT codes for easy promotion and sharing.</li>
          </ul>
        </li>
        <li className="text-paragraph-1">
          Royalty Earnings & Payouts
          <ul className="list-disc ml-2">
            <li>
              80% of your earnings go to you—ForeVision Digital takes a 20% flat
              commission from revenues.
            </li>
            <li>
              Royalty reports are provided periodically for full transparency.
            </li>
            <li>
              Withdraw your earnings via bank transfer or other supported
              methods.
            </li>
          </ul>
        </li>

        <li className="text-paragraph-1">
          Lyrics Monetization & Licensing
          <ul className="list-disc ml-2">
            <li>
              Get your lyrics featured on platforms like LyricFind & Musixmatch.
            </li>
            <li>Additional revenue streams through lyric licensing. </li>
          </ul>
        </li>

        <li className="text-paragraph-1">
          Dedicated Support & Insights
          <ul className="list-disc ml-2">
            <li>Live chat support for quick assistance.</li>
            <li>
              Analytics & insights on your music’s performance, listener
              demographics, and streaming trends.
            </li>
          </ul>
        </li>
      </ol>

      <h6 className="text-heading-6-bold mb-1 mt-4">Pricing & Subscription</h6>
      <ul>
        <li className="flex gap-1 items-center">
          <FaCheck /> ₹4,299/year – One-time payment for a full year of
          distribution.
        </li>
        <li className="flex gap-1 items-center">
          <FaCheck /> Flat 20% revenue share—no hidden costs.
        </li>
        <li className="flex gap-1 items-center">
          <FaCheck /> Easy payouts & detailed earnings reports.
        </li>
      </ul>

      <h6 className="text-heading-6-bold mb-1 mt-4">How to Get Started?</h6>
      <ol className="list-decimal ml-2">
        <li>Sign up for free on the ForeVision Digital platform.</li>
        <li>Upload your music with the necessary metadata.</li>
        <li>Select your distribution & caller tune preferences.</li>
        <li>Go live on all platforms and start earning!</li>
      </ol>

      <p className="py-2">Join ForeVision Digital Today!</p>

      <p>
        Distribute. Monetize. Grow. <br />
        Visit ForeVision Digital to get started!
      </p>

      <Button
        className={
          "bg-white w-full !text-interactive-light hover:!bg-surface-white-line focus:!bg-surface-white-line justify-center"
        }
        containerClassName={"mt-7"}
        onClick={handleSubmit}
        disabled={loading}
      >
        Get{loading ? "ting" : ""} started
      </Button>
    </div>
  );
};

export default YearlyPlanText;
