import React, { useState } from "react";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { backendUrl } from "../../constants";
import logo from "../../assets/icons/logo.PNG";
import Toggle from "../../components/Toggle/Toggle";
import SongPlans from "../SongPlans/SongPlans";
import AlbumPlan from "../../components/AlbumPlan/AlbumPlan";
import Form from "../../components/Form/Form";

const Plans = () => {
  const [checked, setChecked] = useState(false);
  const [Razorpay] = useRazorpay();

  const handleRazorpayPayment = async (amount) => {
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
      .post(backendUrl + "razorpay", { amount }) // ============  *** Need to set amount dynamically here ***  ================
      .then(({ data }) => initPayment(data))
      .catch((error) => console.log(error));
  };

  const handlePhonePePayment = (amount) => {
    // console.log(amount);
    // const options = {
    //   method: "post",
    //   url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
    //   headers: {
    //     accept: "text/plain",
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     merchantId: "PGTESTPAYUAT",
    //     merchantTransactionId: "MT7850590068188104",
    //     merchantUserId: "MUID123",
    //     amount: 10000,
    //     redirectUrl: "https://webhook.site/redirect-url",
    //     redirectMode: "REDIRECT",
    //     callbackUrl: "https://webhook.site/callback-url",
    //     mobileNumber: "9999999999",
    //     paymentInstrument: {
    //       type: "PAY_PAGE",
    //     },
    //   },
    // };

    const options = {
      method: "post",
      url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      data: {},
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
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
    <div className="lg:ml-6" id="plans-page">
      <h3 className="text-heading-3-bold text-center mt-6 text-grey-dark">
        Plans We Offer
      </h3>

      <p className="lg:w-1/2 my-2 text-grey-dark mx-auto text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid unde
        illum laborum cumque, quibusdam saepe quasi perspiciatis nam ratione
        possimus!
      </p>

      <div className="flex justify-center items-center gap-1">
        <p>Song</p>
        <Toggle checked={checked} setChecked={setChecked} />
        <p>Album</p>
      </div>

      {checked ? (
        <AlbumPlan
          handleRazorpayPayment={handleRazorpayPayment}
          handlePhonePePayment={handlePhonePePayment}
        />
      ) : (
        <SongPlans
          handleRazorpayPayment={handleRazorpayPayment}
          handlePhonePePayment={handlePhonePePayment}
        />
      )}
    </div>
  );
};

export default Plans;
