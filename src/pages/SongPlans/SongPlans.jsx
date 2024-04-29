import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Button from "../../components/Button/Button";
import ReactOwlCarousel from "react-owl-carousel";
import { SiAirtel } from "react-icons/si";

import bsnl from "../../assets/icons/bsnl.webp";
import idea from "../../assets/icons/idea.webp";
import jio from "../../assets/icons/jio.webp";
import { backendUrl } from "../../constants";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

const SongPlans = ({ handleRazorpayPayment }) => {
  const navigate = useNavigate();
  // const [position, setPosition] = useState(0);
  const positionRef = useRef(0);
  // const [classList, setClassList] = useState("owl-prev disabled");

  // useEffect(() => {
  //   console.log(positionRef.current);
  // }, [positionRef.current]);

  const handlePrevClick = () => {
    document.querySelector(".song-plans .owl-prev").click();
    // setClassList(
    //   document.querySelector(".song-plans .owl-prev").classList.value
    // );
  };

  const handleNextClick = () => {
    document.querySelector(".song-plans .owl-next").click();
    // console.log(document.querySelector(".song-plans .owl-next"));

    // setClassList(
    //   document.querySelector(".song-plans .owl-next").classList.value
    // );
  };

  const handleSlideChange = (e) => {
    // console.log(e);
    if (e.property.value === 0 || typeof e.property.value === "object") {
      document.getElementById("plans-prev").setAttribute("disabled", true);
      document.getElementById("plans-next").removeAttribute("disabled");
    }
    if (e.property.value === 1) {
      document.getElementById("plans-next").setAttribute("disabled", true);
      document.getElementById("plans-prev").removeAttribute("disabled");
    }
  };

  return (
    <div className="overflow-hidden py-5 px-[10px] relative song-plans">
      <Button
        containerClassName={
          "hidden xl:block absolute top-0 bottom-0 my-auto !h-fit !w-fit flex items-center z-10"
        }
        className={
          "text-white w-6 !h-6 !px-0 !py-0 flex items-center justify-center"
        }
        onClick={handlePrevClick}
        // disabled={positionRef.current === 0}
        id="plans-prev"
      >
        <FaArrowLeft className="text-heading-5" />
      </Button>

      <Button
        containerClassName={
          "hidden xl:block absolute top-0 bottom-0 right-2 my-auto !h-fit !w-fit flex items-center z-10"
        }
        className={
          "text-white w-6 !h-6 !px-0 !py-0 flex items-center justify-center"
        }
        onClick={handleNextClick}
        id="plans-next"
      >
        <FaArrowRight className="text-heading-5" />
      </Button>
      <ReactOwlCarousel
        // autoplay={true}
        // autoplayHoverPause
        // autoplayTimeout={1000}
        // slidesPerView={3}
        onChange={handleSlideChange}
        loop={false}
        navigation="true"
        nav
        // modules={[FreeMode, Navigation, Thumbs]}
        // space={30}
        responsive={{
          0: {
            items: 1,
            startPosition: 1,
          },
          768: {
            items: 2,
          },
          1280: {
            items: 3,
          },
        }}
        className="py-6 !overflow-hidden mt-4 text-grey-dark xl:!w-5/6 mx-auto"
      >
        <div className="!h-full p-4 shadow-lg mx-2 relative">
          <div
            className="py-1 px-2 absolute rounded-full flex gap-1 text-paragraph-1"
            style={{ top: -11, right: 16 }}
            id="special"
          >
            <div className="w-4 text-paragraph-1 flex justify-center items-center bg-interactive-light aspect-square text-white rounded">
              <FaFacebookF />
            </div>
            <div className="w-4 text-paragraph-1 flex justify-center items-center bg-interactive-light aspect-square text-white rounded">
              <FaYoutube />
            </div>
            <div className="w-4 text-paragraph-1 flex justify-center items-center bg-interactive-light aspect-square text-white rounded">
              <FaInstagram />
            </div>
          </div>
          <div className="h-full flex flex-col justify-between">
            <aside>
              <h4 className="text-heading-4 font-bold">Forevision Social</h4>
              <h5 className="text-heading-5-bold text-grey mt-2">Free</h5>

              <ul className="flex flex-col gap-1 mt-4">
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    YouTube Content ID, YouTube Music & YouTube Shorts Covered
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Monetize Your Music in Facebook & Instagram</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Get Your Music in Triller, Snapchat & TikTok)</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Schedule Your Own Release Date</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Free Custom Label</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>100% Copyright Will Be Yours</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Get 80% Revenue from the Streamings</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    ForeVision Pro Dashboard with Detailed analytics
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Get lifetime support with zero yearly cost</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Advanced revenue reports</aside>
                </li>
              </ul>
            </aside>

            <Button
              text={"Get Started"}
              className={"w-full justify-center"}
              onClick={() => navigate("/song-upload")}
            ></Button>
          </div>
        </div>
        <div className="!h-full p-4 rounded-lg mx-2 bg-gradient-to-br from-secondary to-interactive-light-focus text-white shadow-[0_13px_20px_#aaa] relative -top-3">
          <div
            className="bg-interactive-light-destructive-focus text-white py-1 px-2 inline-block absolute rounded-full"
            style={{ top: -20, right: 16 }}
            id="special"
          >
            ⭐⭐ Best Rated ⭐⭐
          </div>

          <div className="h-full flex flex-col justify-between">
            <aside>
              <h4 className="text-heading-4 font-bold">Forevision CRBT+</h4>
              <h5 className="text-heading-5-bold text-grey-light mt-2">
                &#8377;699
              </h5>

              <ul className="flex flex-col gap-1 mt-4">
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>
                    All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>Caller Tunes On JIO, Vi, BSNL & Airtel</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>Worldwide Reach</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>All International Apps Covered</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>90% Revenue from Streaming platforms</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>85% Revenue from YouTube Platforms</aside>
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
                  <aside>
                    YouTube Content ID, YouTube Music & YouTube Shorts Covered
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>
                    ForeVision Pro Dashboard with Detailed analytics
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>Get lifetime support with zero yearly cost</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>Monetize Your Music in Facebook & Instagram</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>Lyrics monetization</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>Advanced revenue reports</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>
                    Get Lyrics In Facebook, Instagram, Spotify, JioSaavn, Google
                    & More
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1">
                  <FaCheck />
                  <aside>
                    Various marketing tools with Playlisting options
                  </aside>
                </li>
              </ul>
            </aside>

            <Button
              text={"Get Started"}
              className={"w-full justify-center"}
              onClick={() => handleRazorpayPayment(69900)}
            ></Button>
          </div>

          {/* <div className="h-full flex flex-col justify-between">
            <h4 className="text-heading-4 font-bold">Forevision CRBT+</h4>
            <h5 className="text-heading-5-bold text-grey-light mt-2">
              &#8377;699
            </h5>
            <ul className="flex flex-col gap-1 mt-4">
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>
                  All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn
                </aside>
              </li>
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>Caller Tunes On JIO, Vi, BSNL & Airtel</aside>
              </li>
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>Worldwide Reach</aside>
              </li>
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>All International Apps Covered</aside>
              </li>
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>90% Revenue from Streaming platforms</aside>
              </li>
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>85% Revenue from YouTube Platforms</aside>
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
                <aside>
                  YouTube Content ID, YouTube Music & YouTube Shorts Covered
                </aside>
              </li>
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>ForeVision Pro Dashboard with Detailed analytics</aside>
              </li>
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>Get lifetime support with zero yearly cost</aside>
              </li>
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>Monetize Your Music in Facebook & Instagram</aside>
              </li>
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>Lyrics monetization</aside>
              </li>
              <li className="flex gap-2 text-paragraph-1">
                <FaCheck />
                <aside>Advanced revenue reports</aside>
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
                <aside>Various marketing tools with Playlisting options</aside>
              </li>
            </ul>

            <Button
              text={"Get Started"}
              className={
                "w-full justify-center bg-white !text-interactive-light-hover hover:bg-white-secondary active:bg-white-deactivated focus:bg-white-tertiary"
              }
              onClick={() => handleRazorpayPayment(69900)}
              // containerClassName={"mt-5"}
            ></Button>
          </div> */}
        </div>
        <div className="!h-full p-4 rounded-lg selection:bg-white selection:text-secondary mx-2 shadow-lg relative">
          <div
            className="bg-interactive-light text-white py-1 px-2 inline-block absolute rounded-full"
            style={{ top: -11, right: 16 }}
            id="special"
          >
            Pro
          </div>
          <div className="flex h-full flex-col justify-between">
            <aside>
              <h4 className="text-heading-4 font-bold">Forevision Pro</h4>
              <h5 className="text-heading-5-bold text-grey mt-2">&#8377;498</h5>

              <ul className="flex flex-col gap-1 mt-4">
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>All International Apps Covered</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>90% Revenue from Streaming platforms</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>85% Revenue from YouTube Platforms</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Schedule Your Own Release Date</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Free Custom Label</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>100% Copyright Will Be Yours</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    YouTube Content ID, YouTube Music & YouTube Shorts Covered
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    ForeVision Pro Dashboard with Detailed analytics
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Get lifetime support with zero yearly cost</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Monetize Your Music in Facebook & Instagram</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Advanced revenue reports</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    Various marketing tools with Playlisting options
                  </aside>
                </li>
              </ul>
            </aside>

            <Button
              text={"Get Started"}
              onClick={() => handleRazorpayPayment(49800)}
              className={"w-full justify-center"}
              containerClassName={"mt-3"}
            ></Button>
          </div>
        </div>

        <div className="!h-full p-4 shadow-lg rounded-lg mx-2 relative">
          <div
            className="border border-interactive-light-destructive-focus bg-white py-1 px-2 absolute rounded-full flex gap-1"
            style={{ top: -15, right: 16 }}
            id="special"
          >
            <SiAirtel className="text-interactive-light-destructive-focus" />
            <img className="!w-3 !h-3" src={bsnl} alt="bsnl" />
            <img className="!w-3 !h-3" src={idea} alt="idea" />
            <img className="!w-3 !h-3" src={jio} alt="jio" />
          </div>
          <div className="h-full flex flex-col justify-between">
            <aside>
              <h4 className="text-heading-4 font-bold">Forevision CRBT</h4>
              <h5 className="text-heading-5-bold text-grey mt-2">&#8377;499</h5>

              <ul className="flex flex-col gap-1 mt-4">
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Caller Tunes On JIO, Vi, BSNL & Airtel</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>90% Revenue from Streaming platforms</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>85% Revenue from YouTube Platforms</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Schedule Your Own Release Date</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Free Custom Label</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>100% Copyright Will Be Yours</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    YouTube Content ID, YouTube Music & YouTube Shorts Covered
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    ForeVision Pro Dashboard with Detailed analytics
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Get lifetime support with zero yearly cost</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Advanced revenue reports</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    Various marketing tools with Playlisting options
                  </aside>
                </li>
              </ul>
            </aside>
            <Button
              text={"Get Started"}
              className={"w-full justify-center"}
              onClick={() => handleRazorpayPayment(49900)}
            ></Button>
          </div>
        </div>
      </ReactOwlCarousel>
    </div>
  );
};

export default SongPlans;
