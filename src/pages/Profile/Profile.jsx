import React, { useContext, useEffect, useState } from "react";
import cover from "./../../assets/images/artist-cover.webp";
import userplus from "./../../assets/icons/user-plus.webp";
import facebook from "./../../assets/icons/social/facebook.webp";
import instagram from "./../../assets/icons/social/instagram.webp";
import twitter from "./../../assets/icons/social/twitter.webp";
import downArrowWhite from "./../../assets/icons/down-arrow-white.webp";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import amogh from "../../assets/images/amogh-sympathy.webp";
import Song from "../../components/Song/Song";
import user from "./../../assets/images/user.webp";
// import VerticalCarousel from "../../components/VerticalCarousel/VerticalCarousel";
import { SwiperSlide } from "swiper/react";
import { ProfileContext } from "../../contexts/ProfileContext";
import { Link, useLocation } from "react-router-dom";
import profileEdit from "./../../assets/icons/profile-edit.webp";
import notification from "../../assets/icons/notification-white.webp";
import settingsWhite from "../../assets/icons/settings-white.webp";
import LoadingPulse from "../../components/LoadingPulse/LoadingPulse";
import EditProfile from "../../components/EditProfile/EditProfile";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Songs from "../../components/Songs/Songs";
import axios from "axios";
import { backendUrl } from "../../constants";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { IoMdShareAlt } from "react-icons/io";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaLink } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Profile = () => {
  const { userData } = useContext(ProfileContext);
  const location = useLocation();
  const [profileData, setProfileData] = useState(
    location.pathname === "/profile" ? userData : {}
  );
  const [copied, setCopied] = useState(false);
  // console.log(profileData);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 5000);
    }
  }, [copied]);

  useEffect(() => {
    // Extract the userId from the URL
    const userId = location.pathname.split("/")[2];

    if (userId) {
      // Fetch the profile data using the userId
      axios
        .get(`${backendUrl}profile/${userId}`)
        .then(({ data }) => {
          setProfileData(data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    } else if (location.pathname === "/profile") {
      // If no userId in the URL and pathname is "/profile", use userData
      setProfileData(userData);
    }
  }, [location.pathname, userData]); // Add dependencies

  // console.log(profileData);

  const route = location.pathname.split("/");
  const [edit, setEdit] = useState(false);

  const handleFollow = () => {
    console.log("follow");
  };

  const [details, setDetails] = useState(false);
  const text = profileData.bio;
  console.log(profileData);

  return (
    <div
      className="w-[95%] m-2 mx-auto lg:m-5 lg:my-7 lg:w-[90%] lg:ml-auto rounded-[20px] overflow-y-auto bg-grey-dark h-[98vh]"
      id="profile-container"
    >
      <div className="relative">
        <div className="w-full h-[12rem] lg:h-full">
          <div className="bg-gradient-to-bl from-black-secondary to-20% to-transparent absolute top-0 left-0 w-full h-full">
            <div className="absolute top-2 right-2">
              <div className="flex gap-2 items-center p-1">
                {/* <img
                  className="cursor-pointer"
                  src={notification}
                  title="Notifications"
                  alt=""
                /> */}
                <Link to={"/settings"}>
                  <img
                    className="cursor-pointer"
                    src={settingsWhite}
                    title="Settings"
                    alt=""
                  />
                </Link>
              </div>
            </div>

            <div className="absolute bottom-1 right-1 lg:bottom-2 lg:right-2">
              <img
                src={profileEdit}
                className="cursor-pointer"
                alt=""
                title="Edit your cover photo"
                onClick={() => setEdit(true)}
              />
            </div>
          </div>
          <img
            src={profileData.cover_photo || cover}
            className="object-cover w-full h-[12rem] lg:h-[18rem]"
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-[60px] px-2 lg:p-[60px] pb-0 relative">
        <div className="w-full lg:w-9/12 absolute lg:relative -top-7 lg:top-[-144px]">
          <div className="flex flex-col lg:flex-row gap-[11px]">
            <div className="pt-4">
              <ProfilePicture
                imageUrl={profileData.display_image}
                profileData={profileData}
                // setProfileData={setProfileData}
              />
            </div>
            <aside className="text-white lg:mt-[8rem] lg:w-11/12">
              <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-5">
                <div className="flex items-center gap-2">
                  {profileData.first_name ? (
                    <h5 className="text-heading-5 underline">
                      {profileData.first_name} {profileData.last_name}
                    </h5>
                  ) : (
                    <LoadingPulse className="w-[200px] h-[30px]" />
                  )}

                  {route[route.length - 1] === "profile" &&
                  profileData.first_name ? (
                    <div className="flex items-center space-x-2">
                      <img
                        src={profileEdit}
                        onClick={() => setEdit(true)}
                        className="w-3 h-3 cursor-pointer"
                        alt="edit"
                      />
                      <CopyToClipboard
                        text={
                          window.location.href + "/" + profileData["user-id"]
                        }
                        data-tooltip-id={"copy"}
                        onCopy={() => setCopied(true)}
                        data-tooltip-content={
                          copied ? "Copied" : "Copy Link To Clipboard"
                        }
                        className="cursor-pointer text-heading-6 focus:outline-none"
                      >
                        <FaLink />
                      </CopyToClipboard>
                      <Tooltip id={"copy"} />
                    </div>
                  ) : profileData.first_name ? (
                    <div className="flex items-center space-x-2">
                      <img
                        src={userplus}
                        onClick={handleFollow}
                        className="w-3 h-3 cursor-pointer"
                        alt="follow"
                      />
                      <CopyToClipboard
                        text={
                          window.location.href + "/" + profileData["user-id"]
                        }
                        data-tooltip-id={"copy"}
                        onCopy={() => setCopied(true)}
                        data-tooltip-content={
                          copied ? "Copied" : "Copy Link To Clipboard"
                        }
                        className="cursor-pointer text-heading-6 focus:outline-none"
                      >
                        <FaLink />
                      </CopyToClipboard>
                      <Tooltip id={"copy"} />
                    </div>
                  ) : (
                    <LoadingPulse width={"30px"} height={"30px"} />
                  )}
                </div>

                <div
                  className={`${
                    profileData.first_name
                      ? "flex gap-[10px]"
                      : "grid grid-cols-3 gap-[10px]"
                  }`}
                >
                  {profileData.facebook_profile_link && (
                    <a
                      href={profileData.facebook_profile_link}
                      className="text-heading-6"
                    >
                      <FaSquareFacebook />
                    </a>
                  )}
                  {profileData.instagram_profile_link && (
                    <a
                      href={profileData.instagram_profile_link}
                      className="text-heading-6"
                    >
                      <FaSquareInstagram />
                    </a>
                  )}
                  {profileData.twitter_profile_link && (
                    <a
                      href={profileData.twitter_profile_link}
                      className="text-heading-6"
                    >
                      <FaSquareXTwitter />
                    </a>
                  )}
                </div>
              </div>

              {/* <p className="text-[12px] mt-[6px]">99 Followers</p> */}
              <p className="text-[12px] mt-1 mb-0 font-bold tracking-[1.25px] uppercase">
                {profileData["short-bio"]}
              </p>

              <p className="text-[12px] lg:w-1/2 text-center lg:text-left">
                {text?.slice(0, details ? text.length - 1 : 200)}{" "}
                {!details && text && "..."}
                <br />
                {text?.length > 200 && (
                  <button
                    className="items-center gap-[6px] mt-1 justify-center lg:justify-start inline-flex w-full"
                    onClick={() => setDetails(!details)}
                  >
                    {details ? (
                      <>
                        SHOW LESS{" "}
                        <img
                          src={downArrowWhite}
                          className="rotate-180"
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        SHOW MORE <img src={downArrowWhite} alt="" />
                      </>
                    )}
                  </button>
                )}
              </p>
            </aside>
          </div>
        </div>
        <div className="mt-[21rem] lg:mt-0 lg:w-1/4">
          <div className="flex items-center" id="album">
            {/* <OwlCarousel
              className="owl-theme"
              loop={true}
              autoplay
              autoplayTimeout={3000}
              items={1}
              margin={10}
              dots={false}
            >
              <div className="item">
                <img src={amogh} alt="amogh" />
                <div className="text-button text-white text-center mt-[4px]">
                  Dummy Album
                </div>
              </div>
              <div className="item">
                <img src={amogh} alt="amogh" />
                <div className="text-button text-white text-center mt-[4px]">
                  Dummy Album
                </div>
              </div>
              <div className="item">
                <img src={amogh} alt="amogh" />
                <div className="text-button text-white text-center mt-[4px]">
                  Dummy Album
                </div>
              </div>
              <div className="item">
                <img src={amogh} alt="amogh" />
                <div className="text-button text-white text-center mt-[4px]">
                  Dummy Album
                </div>
              </div>
              <div className="item">
                <img src={amogh} alt="amogh" />
                <div className="text-button text-white text-center mt-[4px]">
                  Dummy Album
                </div>
              </div>
              <div className="item">
                <img src={amogh} alt="amogh" />
                <div className="text-button text-white text-center mt-[4px]">
                  Dummy Album
                </div>
              </div>
              <div className="item">
                <img src={amogh} alt="amogh" />
                <div className="text-button text-white text-center mt-[4px]">
                  Dummy Album
                </div>
              </div>
              <div className="item">
                <img src={amogh} alt="amogh" />
                <div className="text-button text-white text-center mt-[4px]">
                  Dummy Album
                </div>
              </div>
            </OwlCarousel> */}
          </div>

          <div id="suggestion">
            {/* <VerticalCarousel
              className="bg-interactive-dark-disabled mt-5 py-3 px-5 w-[231px] mx-auto rounded-[20px]"
              heading="You might follow"
            >
              <SwiperSlide>
                <div className="flex gap-1">
                  <img src={user} className="w-4 h-4" alt="" />
                  <div className="text-paragraph-2 text-white">
                    <p>John Doe</p>
                    <p>99 Followers</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex gap-1">
                  <img src={user} className="w-4 h-4" alt="" />
                  <div className="text-paragraph-2 text-white">
                    <p>John Doe</p>
                    <p>99 Followers</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex gap-1">
                  <img src={user} className="w-4 h-4" alt="" />
                  <div className="text-paragraph-2 text-white">
                    <p>John Doe</p>
                    <p>99 Followers</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex gap-1">
                  <img src={user} className="w-4 h-4" alt="" />
                  <div className="text-paragraph-2 text-white">
                    <p>John Doe</p>
                    <p>99 Followers</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex gap-1">
                  <img src={user} className="w-4 h-4" alt="" />
                  <div className="text-paragraph-2 text-white">
                    <p>John Doe</p>
                    <p>99 Followers</p>
                  </div>
                </div>
              </SwiperSlide>
            </VerticalCarousel> */}
          </div>
        </div>
      </div>

      <div className="mt-2 mb-6 lg:my-2 px-2 lg:px-[60px] mx-auto">
        <Songs />
      </div>

      {edit && <EditProfile handleClose={() => setEdit(false)} />}
    </div>
  );
};

export default Profile;
