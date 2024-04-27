import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import razorpay from "./../../assets/icons/razorpay.png";
import phonepe from "./../../assets/icons/phonepe.png";
import paypal from "./../../assets/icons/paypal.png";

const AlbumPlan = ({ handleRazorpayPayment, handlePhonePePayment }) => {
  const [modal, showModal] = useState(false);

  return (
    <>
      <div className="!h-full p-4 rounded-lg bg-gradient-to-br from-secondary to-interactive-light-focus text-white shadow-[0_13px_20px_#aaa] relative -top-3 w-11/12 md:w-1/2 xl:w-1/3 mx-auto mt-7">
        <div
          className="bg-interactive-light-destructive-focus text-white py-1 px-2 inline-block absolute rounded-full"
          style={{ top: -20, right: 16 }}
          id="special"
        >
          ⭐⭐ Best Rated ⭐⭐
        </div>
        <h4 className="text-heading-4 font-bold">Forevision Album</h4>
        <h5 className="text-heading-5-bold text-grey-light mt-2">&#8377;999</h5>

        <ul className="flex flex-col gap-1 mt-4">
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside className="font-semibold">
              Unlimited song under 1 (one) UPC
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>
              All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Caller Tunes On JIO, Vi, BSNL, Airtel</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Your Music Will Be Live Everywhere</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Caller Tune Facility</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>All International Apps Covered</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Upload Music In Specific Stores</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Get 90% Lifetime Royalties</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Schedule Your Own Release Date</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Free Custom Label</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>100% Copyright Will Be Yours</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>YouTube Content ID & YouTube Music</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>ForeVision Dashboard</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Lifetime Support</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Get Your Music In Facebook & Instagram</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Earn With Facebook And Instagram</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Song Migration Accepted</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Previously Released Songs Accepted</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Quarterly Report Directly On Dashboard</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Approval Within 3-4 Hrs</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Availability Lifetime</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Zero Yearly Fee</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Including ForeVision Special Service</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>
              Get Lyrics In Facebook, Instagram, Spotify, JioSaavn, Google &
              More
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1">
            <FaCheck />
            <aside>Platform Playlist Pitch</aside>
          </li>
        </ul>

        <Button
          text={"Get Started"}
          className={
            "w-full justify-center bg-white !text-interactive-light-hover hover:bg-white-secondary active:bg-white-deactivated focus:bg-white-tertiary"
          }
          //   onClick={() => handleRazorpayPayment(99900)}
          onClick={() => showModal(true)}
          containerClassName={"mt-5"}
        ></Button>
      </div>

      {modal && (
        <Modal>
          <div className="w-11/12 lg:w-1/2 xl:w-1/4 h-3/4 bg-white m-auto relative p-2 rounded-lg">
            <button
              className="absolute -top-5 -right-5 text-heading-4 text-interactive-light-destructive-focus"
              onClick={() => showModal(false)}
            >
              &times;
            </button>

            <h5 className="text-heading-5-bold text-white-secondary bg-primary absolute top-0 left-0 w-full p-2 rounded-t-lg">
              Select Your Payment Method
            </h5>

            <button
              className="w-full flex justify-center py-2 border-2 border-primary rounded-full mt-6"
              onClick={() => {
                handleRazorpayPayment(99900);
                // setTimeout(() => showModal(false), 1000);
                setTimeout(() => {
                  showModal(false);
                }, 700);
              }}
            >
              <img src={razorpay} alt="razorpay" className="w-1/3" />
            </button>

            <button
              className="w-full flex justify-center py-2 border-2 border-secondary-dark rounded-full mt-2"
              onClick={() => handlePhonePePayment(99900)}
            >
              <img src={phonepe} alt="phonepe" className="w-1/3" />
            </button>

            <button
              className="w-full flex justify-center py-2 border-2 border-secondary-dark rounded-full mt-2"
              // onClick={() => handleRazorpayPayment(99900)}
            >
              <img src={paypal} alt="paypal" className="w-1/3" />
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AlbumPlan;
