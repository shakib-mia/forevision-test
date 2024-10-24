import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { backendUrl, config } from "../../constants";
import logo from "../../assets/icons/logo.PNG";
import razorpay from "./../../assets/icons/razorpay.png";
import phonepe from "../../assets/icons/phonepe.png";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ProfileContext } from "../../contexts/ProfileContext";
import { PlanContext } from "../../contexts/PlanContext";
import { ScreenContext } from "../../contexts/ScreenContext";
import { formatDate } from "../../utils/formatDate";

const Payment = () => {
  const [Razorpay] = useRazorpay();
  const location = useLocation();
  const { token, userData } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [songData, setSongData] = useState({});
  const { formData } = useContext(ScreenContext);
  const { setPlanStore, planStore } = useContext(PlanContext);

  // console.log();
  // console.log(planStore);
  // console.log(data);
  // console.log();
  const songId = location.search.split("?")[2].split("=")[1];
  // console.log(songId);

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  useEffect(() => {
    // console.log(location.search.split("?")[2].split("=")[1]);
    axios
      .get(
        backendUrl +
          "songs/by-order-id/" +
          location.search.split("?")[2].split("=")[1]
      )
      .then(({ data }) => {
        console.log(data);
        setSongData(data);
      });
  }, []);

  // console.log(location.search.split("=")[1]);

  const handleRazorpayPayment = async (params) => {
    // const order = await createOrder(params); //  Create order on your backend

    // const options = {
    //   key: "rzp_test_kOukh9hO3yXkNx", // Enter the Key ID generated from the Dashboard
    //   amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //   currency: "INR",
    //   name: "Acme Corp",
    //   description: "Test Transaction",
    //   image: "https://example.com/your_logo",
    //   order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    //   handler: function (response) {
    //     alert(response.razorpay_payment_id);
    //     alert(response.razorpay_order_id);
    //     alert(response.razorpay_signature);
    //   },
    //   prefill: {
    //     name: "Piyush Garg",
    //     email: "youremail@example.com",
    //     contact: "9999999999",
    //   },
    //   notes: {
    //     address: "Razorpay Corporate Office",
    //   },
    //   theme: {
    //     color: "#3399cc",
    //   },
    // };

    // const rzp1 = new Razorpay(options);

    // rzp1.on("payment.failed", function (response) {
    //   alert(response.error.code);
    //   alert(response.error.description);
    //   alert(response.error.source);
    //   alert(response.error.step);
    //   alert(response.error.reason);
    //   alert(response.error.metadata.order_id);
    //   alert(response.error.metadata.payment_id);
    // });
    // console.log();
    // rzp1.open();

    axios
      .post(backendUrl + "razorpay", {
        amount: parseFloat(location.search.split("?")[1].split("=")[1]),
        currency: userData.billing_country === "Indian" ? "INR" : "USD",
      }) // ============  *** Need to set amount dynamically here ***  ================
      .then(({ data }) => initPayment(data))
      .catch((error) => console.log(error));
  };
  // console.log(location);
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_3Tvb4i0zxX8t5m",
      amount: data.amount,
      // currency: data.currency,
      name: data.name,
      currency: userData.billing_country === "Indian" ? "INR" : "USD",
      description: "Test",
      image: logo,
      order_id: data.id,
      handler: async (response) => {
        // response.songId =
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const verifyUrl = backendUrl + "razorpay/verify";
          const config = {
            headers: {
              token,
            },
          };
          // console.log(config);
          const res = await axios.post(verifyUrl, response, config);
          console.log(res);

          if (res.data.insertCursor.acknowledged) {
            setPlanStore((prev) => ({ ...prev, ...res.data }));
            // navigate("/payment-success");
            // clg;
            console.log(songData, razorpay_order_id);
            songData.order_id = razorpay_order_id;
            songData.payment_id = razorpay_payment_id;
            songData.status = "paid";
            songData.paymentDate = formatDate(new Date());
            axios
              .put(
                backendUrl +
                  "songs/by-order-id/" +
                  location.search.split("?")[2].split("=")[1],
                songData
              )
              .then(({ data }) => {
                if (data.acknowledged) {
                  axios
                    .get(
                      `${backendUrl}plans/monthly-sales/${
                        location.search.split("?")[1].split("=")[1]
                      }`,
                      {
                        headers: {
                          token,
                        },
                      }
                    )
                    .then(({ data }) => console.log(data));
                  navigate("/payment-success");
                }
              });
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#064088",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };
  // console.log();

  // const handlePhonePePayment = (amount) => {
  //   console.log(amount);
  //   const options = {
  //     method: "post",
  //     url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
  //     headers: {
  //       accept: "text/plain",
  //       "Content-Type": "application/json",
  //     },
  //     data: {
  //       merchantId: "PGTESTPAYUAT",
  //       merchantTransactionId: "MT7850590068188104",
  //       merchantUserId: "MUID123",
  //       amount: 10000,
  //       redirectUrl: "https://webhook.site/redirect-url",
  //       redirectMode: "REDIRECT",
  //       callbackUrl: "https://webhook.site/callback-url",
  //       mobileNumber: "9999999999",
  //       paymentInstrument: {
  //         type: "PAY_PAGE",
  //       },
  //     },
  //   };

  //   const data = {
  //     name: "shakib",
  //     amount: 1,
  //     number: 91812345679,
  //     MID: "MID" + Date.now(),
  //     merchantTransactionId: "T" + Date.now(),
  //   };

  //   axios
  //     .post(backendUrl + "phonepe-payment/pay", data)
  //     .then(({ data }) => {
  //       console.log(data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-grey-light">
      <div className="flex flex-col w-10/12 md:w-1/2 xl:w-1/4 relative shadow-xl bg-white rounded-lg">
        {/* <h5 className="text-heading-5-bold text-white-secondary bg-primary absolute top-0 left-0 w-full p-2 rounded-t-lg">
          Select Your Payment Method
        </h5> */}

        <div className="p-4">
          <button
            className="w-full flex justify-center py-2 border-2 border-primary rounded-full mb-3" // mt-6 will be here when more methods and header will be added
            onClick={() => {
              handleRazorpayPayment(99900);
            }}
          >
            <img src={razorpay} alt="razorpay" className="w-1/3" />
          </button>

          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default Payment;
