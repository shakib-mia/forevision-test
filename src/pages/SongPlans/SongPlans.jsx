import React from "react";
import { FaCheck, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
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
  return (
    <div className="overflow-hidden py-5 px-[10px]">
      <ReactOwlCarousel
        autoplay={true}
        autoplayHoverPause
        autoplayTimeout={1000}
        // slidesPerView={3}
        loop={true}
        navigation
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
        className="py-2 !overflow-visible mt-4 text-grey-dark"
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
                  <aside>YouTube Music</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>YT Shorts</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Meta(Fb & Insta)</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Triller</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Snapchat</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>TikTok</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>YouTube Content ID</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>YouTube Finger Print</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Earn With Facebook And Instagram</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>YouTube Topic</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Free Custom Label</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Use Your Own ISRC & UPC</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Schedule Your Own Release Date</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Previously Released Songs Accepted</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Song Migration Accepted</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>
                    90% Royalties From Meta, Triller, TikTok & Snapchat
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>ForeVision Dashboard</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Lifetime Support</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>100% Copyright</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Quarterly Report Directly On Dashboard</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Approval Within 2 Hours</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Release Within 24 Hrs</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Availability Lifetime</aside>
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
            onClick={() => handleRazorpayPayment(69900)}
            containerClassName={"mt-5"}
          ></Button>
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
                  <aside>No Caller Tune Facility</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Upload Music In Specific Stores</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Get 90% Lifetime Royalties</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Free Custom Label</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Schedule Your Own Release Date</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>100% Copyright Will Be Yours</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>YouTube Content ID & YouTube Music</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Get Your Music In Facebook & Instagram</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Earn With Facebook And Instagram</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>ForeVision Dashboard</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Lifetime Support</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Quarterly Report Directly On Dashboard</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Approval Within 3-4 Hrs</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Song Migration Accepted</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Previously Released Songs Accepted</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Availability Lifetime</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Zero Yearly Fee</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Including ForeVision Special Service </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Platform Playlist Pitch</aside>
                </li>
              </ul>
            </aside>

            <Button
              text={"Get Started"}
              onClick={() => handleRazorpayPayment(49800)}
              className={"w-full justify-center"}
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
                    Your Music Will Be Live In JioSaavn, Gaana, Hungama & Wynk
                    Music.
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Caller Tunes On JIO, Vi, BSNL, Airtel</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Upload Music In Specific Stores</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Get 90% Lifetime Royalties</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Free Custom Label</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Schedule Your Own Release Date</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>100% Copyright Will Be Yours</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Previously Released Songs Accepted</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Song Migration Accepted</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>YouTube Content ID & YouTube Music</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Lifetime Support</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Quarterly Report Directly On Dashboard</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>ForeVision Dashboard</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Approval Within 3-4 Hrs</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Song Availability Lifetime</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Zero Yearly Fee</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Including ForeVision Special Service </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck />
                  <aside>Platform Playlist Pitch</aside>
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
