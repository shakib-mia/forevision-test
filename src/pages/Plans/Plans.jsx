import React, { useState } from "react";
// import useRazorpay from "react-razorpay";
// import axios from "axios";
// import { backendUrl, config } from "../../constants";
// import logo from "../../assets/icons/logo.PNG";
import Toggle from "../../components/Toggle/Toggle";
import SongPlans from "../SongPlans/SongPlans";
import AlbumPlan from "../../components/AlbumPlan/AlbumPlan";
// import Form from "../../components/Form/Form";
// import { toast } from "react-toastify";
// import { ProfileContext } from "../../contexts/ProfileContext";

const Plans = () => {
  const [checked, setChecked] = useState(false);
  // const [Razorpay] = useRazorpay();
  // const { token } = useContext(ProfileContext);
  const [planName, setPlanName] = useState("");
  // console.log(planName);

  // const handleRazorpayPayment = async (amount) => {
  //   // const order = await createOrder(params); //  Create order on your backend

  //   // const options = {
  //   //   key: "rzp_test_kOukh9hO3yXkNx", // Enter the Key ID generated from the Dashboard
  //   //   amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //   //   currency: "INR",
  //   //   name: "Acme Corp",
  //   //   description: "Test Transaction",
  //   //   image: "https://example.com/your_logo",
  //   //   order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
  //   //   handler: function (response) {
  //   //     alert(response.razorpay_payment_id);
  //   //     alert(response.razorpay_order_id);
  //   //     alert(response.razorpay_signature);
  //   //   },
  //   //   prefill: {
  //   //     name: "Piyush Garg",
  //   //     email: "youremail@example.com",
  //   //     contact: "9999999999",
  //   //   },
  //   //   notes: {
  //   //     address: "Razorpay Corporate Office",
  //   //   },
  //   //   theme: {
  //   //     color: "#3399cc",
  //   //   },
  //   // };

  //   // const rzp1 = new Razorpay(options);

  //   // rzp1.on("payment.failed", function (response) {
  //   //   alert(response.error.code);
  //   //   alert(response.error.description);
  //   //   alert(response.error.source);
  //   //   alert(response.error.step);
  //   //   alert(response.error.reason);
  //   //   alert(response.error.metadata.order_id);
  //   //   alert(response.error.metadata.payment_id);
  //   // });

  //   // rzp1.open();

  //   axios
  //     .post(backendUrl + "razorpay", { amount }) // ============  *** Need to set amount dynamically here ***  ================
  //     .then(({ data }) => {
  //       initPayment(data);
  //       console.log(data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const handlePhonePePayment = (amount) => {
  //   // console.log(amount);
  //   // const options = {
  //   //   method: "post",
  //   //   url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
  //   //   headers: {
  //   //     accept: "text/plain",
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // data: {
  //   //   merchantId: "PGTESTPAYUAT",
  //   //   merchantTransactionId: "MT7850590068188104",
  //   //   merchantUserId: "MUID123",
  //   //   amount: 10000,
  //   //   redirectUrl: "https://webhook.site/redirect-url",
  //   //   redirectMode: "REDIRECT",
  //   //   callbackUrl: "https://webhook.site/callback-url",
  //   //   mobileNumber: "9999999999",
  //   //   paymentInstrument: {
  //   //     type: "PAY_PAGE",
  //   //   },
  //   // },
  //   // };

  //   const data = {
  //     name: "shakib",
  //     amount: 1,
  //     number: 91812345679,
  //     MID: "MID" + Date.now(),
  //     merchantTransactionId: "T" + Date.now(),
  //   };

  //   // console.log(data);

  //   axios
  //     .post("http://localhost:5100/phonepe-payment/pay", data)
  //     .then(({ data }) => {
  //       console.log(data);
  //       // window.open(data.data.instrumentResponse.redirectInfo.url);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const initPayment = (data) => {
  //   const config = {
  //     headers: {
  //       token: sessionStorage.getItem("token") || token,
  //     },
  //   };
  //   const options = {
  //     key: "rzp_test_ltnS4Oawf8bRte",
  //     amount: data.amount,
  //     currency: data.currency,
  //     name: data.name,
  //     description: "Test",
  //     image: logo,
  //     order_id: data.id,
  //     handler: async (response) => {
  //       try {
  //         const verifyUrl = backendUrl + "razorpay/verify";
  //         const res = await axios.post(
  //           verifyUrl,
  //           { ...response, paidAmount: data.amount, planName },
  //           config
  //         );

  //         toast.success(res.data, {
  //           position: "bottom-center",
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     },
  //     theme: {
  //       color: "#064088",
  //     },
  //   };

  //   const rzp1 = new Razorpay(options);
  //   rzp1.open();
  // };

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
        <div className="grid grid-cols-2 items-center">
          <aside className="pl-7 flex flex-col justify-between">
            <h2 className="text-heading-2-bold">Lorem, ipsum.</h2>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              sapiente, repellendus, omnis eaque consectetur earum atque et
              doloribus dignissimos provident praesentium quia. Dicta maxime
              provident exercitationem dolore eum, voluptate eveniet asperiores
              atque reiciendis, ut maiores, minima quis hic quia! Doloremque
              sint, facilis distinctio repudiandae eveniet ratione veritatis
              culpa provident? Id!
            </p>

            <img
              src={
                "https://betterstudio.com/wp-content/uploads/2019/05/1-1-instagram-1024x1024.jpg"
              }
              className="mt-4"
              alt=""
            />
          </aside>
          <AlbumPlan
          // handleRazorpayPayment={handleRazorpayPayment}
          // handlePhonePePayment={handlePhonePePayment}
          />
        </div>
      ) : (
        <SongPlans
          // handleRazorpayPayment={handleRazorpayPayment}
          // handlePhonePePayment={handlePhonePePayment}
          setPlanName={setPlanName}
        />
      )}
    </div>
  );
};

export default Plans;
