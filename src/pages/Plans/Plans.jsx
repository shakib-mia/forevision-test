import React, { useState } from "react";
import {
  FaCheck,
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import ReactOwlCarousel from "react-owl-carousel";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import Button from "../../components/Button/Button";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { backendUrl } from "../../constants";
import logo from "../../assets/icons/logo.PNG";
import { SiAirtel } from "react-icons/si";
import Toggle from "../../components/Toggle/Toggle";
import SongPlans from "../SongPlans/SongPlans";
import AlbumPlan from "../../components/AlbumPlan/AlbumPlan";
import Form from "../../components/Form/Form";

const Plans = () => {
  const [checked, setChecked] = useState(false);
  const [Razorpay] = useRazorpay();

  const handlePayment = async (amount) => {
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

  const fields = [
    { placeholder: "Enter Yor Email ID", name: "emailId" },
    { placeholder: "Phone Number", name: "phoneNo." },
    { placeholder: "Total Released Song", name: "totalReleasedSong" },
    { placeholder: "Total Revenue Earned", name: "totalRevenueEarned" },
    { placeholder: "Spotify Profile Link", name: "spotifyProfileLink" },
    { placeholder: "JioSaavn Profile Link", name: "jioSaavnProfileLink" },
    { placeholder: "Wynk Profile Link", name: "wynkProfileLink" },
    { placeholder: "Monthly Listeners", name: "monthlyListeners" },
    {
      placeholder: "Instagram account link",
      name: "instagramAccountLink",
      type: "number",
    },
    {
      placeholder:
        "Number of songs uploaded till date through Forevision ( eta Prantik er input)",
    },
  ];

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
        <AlbumPlan handlePayment={handlePayment} />
      ) : (
        <SongPlans handlePayment={handlePayment} />
      )}

      <div className="flex gap-6">
        <Form
          heading="Lorem ipsum dolor"
          containerClassName="mt-5 !mx-0 !ml-4 !w-5/12 !px-4"
          fields={fields}
          headingSize="text-heading-3-bold"
        ></Form>
        <aside className="w-7/12 pt-7 pr-4">
          <h1 className="text-heading-1-bold">Lorem, ipsum dolor.</h1>
          <p className="text-paragraph-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            nulla, ipsam eum dignissimos praesentium sunt suscipit minima culpa
            nisi odit aliquid, qui doloremque accusantium eligendi rerum omnis?
            Id incidunt iure eum aperiam tempore deleniti animi distinctio
            facilis, nemo a repellendus ex inventore placeat minima, harum
            adipisci. Illum similique quo dicta perspiciatis eos at repudiandae,
            tempora cum cumque provident ducimus itaque mollitia, eum maiores
            quasi excepturi libero eligendi id molestiae reiciendis nam modi!
            Quisquam ut est deleniti maxime suscipit vero quos itaque doloribus
            delectus molestiae! Animi nesciunt nihil consequatur, ipsa corrupti
            possimus cumque voluptates eligendi, nobis enim quae sunt? Dolorem
            perferendis fugit nemo quis ipsa necessitatibus ducimus ipsam eos,
            iure dolorum ad soluta provident assumenda illo voluptatibus
            molestias mollitia? Sunt id est, soluta obcaecati eligendi excepturi
            quod eveniet tempore maxime doloribus voluptate officia fugiat
            consequatur fugit in quia porro aspernatur tenetur a ut. Quaerat eos
            accusamus necessitatibus, laboriosam officia provident praesentium?
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Plans;
