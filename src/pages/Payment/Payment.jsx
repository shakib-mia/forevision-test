import axios from "axios";
import React from "react";
import useRazorpay from "react-razorpay";
import { backendUrl } from "../../constants";
import logo from "../../assets/icons/logo.PNG";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const [Razorpay] = useRazorpay();
  const location = useLocation();

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

    // rzp1.open();

    axios
      .post(backendUrl + "razorpay", { amount: location.search.split("=")[1] }) // ============  *** Need to set amount dynamically here ***  ================
      .then(({ data }) => initPayment(data))
      .catch((error) => console.log(error));
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_ltnS4Oawf8bRte",
      amount: data.amount,
      currency: data.currency,
      name: data.name,
      description: "Test",
      image: logo,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = backendUrl + "razorpay/verify";
          const { data } = axios.post(verifyUrl, response);
          console.log(data);
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

  return (
    <div className="ml-7">
      <button onClick={handleRazorpayPayment}>open razorpay</button>
    </div>
  );
};

export default Payment;
