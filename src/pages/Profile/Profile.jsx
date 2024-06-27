import React, { useContext, useState } from "react";
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
import { useLocation } from "react-router-dom";
import profileEdit from "./../../assets/icons/profile-edit.webp";
import notification from "../../assets/icons/notification-white.webp";
import settingsWhite from "../../assets/icons/settings-white.webp";
import LoadingPulse from "../../components/LoadingPulse/LoadingPulse";
import EditProfile from "../../components/EditProfile/EditProfile";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Songs from "../../components/Songs/Songs";

const Profile = () => {
  const { userData } = useContext(ProfileContext);
  const location = useLocation();
  const route = location.pathname.split("/");
  const [edit, setEdit] = useState(false);

  const handleFollow = () => {
    console.log("follow");
  };

  const [details, setDetails] = useState(false);
  const text =
    "Archaeologists uncover the mythical city of Atlantis, but soon realize they are not alone in their discovery as supernatural forces threaten to destroy them Archaeologists uncover the mythical city of Atlantis, but soon realize they are not alone in their discovery as supernatural forces threaten to destroy them";
  // console.log(userData);
  return (
    <div
      className="w-[90%] m-5 my-2 ml-auto rounded-[20px] overflow-hidden bg-grey-dark h-[98vh]"
      id="profile-container"
    >
      <div className="relative">
        <div className="w-full h-full">
          <div className="bg-gradient-to-bl from-black-secondary to-20% to-transparent absolute top-0 left-0 w-full h-full">
            <div className="absolute top-2 right-2">
              <div className="flex gap-2 items-center  p-1">
                <img
                  className="cursor-pointer"
                  src={notification}
                  title="Notifications"
                  alt=""
                />
                <img
                  className="cursor-pointer"
                  src={settingsWhite}
                  title="Settings"
                  alt=""
                />
              </div>
            </div>

            <div className="absolute bottom-2 right-2">
              <img
                src={profileEdit}
                className="cursor-pointer"
                alt=""
                title="Edit your cover photo"
              />
            </div>
          </div>
          <img src={cover} className="w-full" alt="" />
        </div>
      </div>

      <div className="flex gap-[60px] p-[60px] pb-0">
        <div className="w-9/12 relative top-[-144px]">
          <div className="flex gap-[11px]">
            <div className="pt-4">
              <ProfilePicture imageUrl={userData.display_image} />
            </div>
            <aside className="text-white mt-[91px] w-11/12">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  {userData.display_name ? (
                    <h5 className="text-heading-5 underline">
                      {userData.display_name}
                    </h5>
                  ) : userData.first_name ? (
                    <h5 className="text-heading-5 underline">
                      {userData.first_name} {userData.last_name}
                    </h5>
                  ) : (
                    <LoadingPulse className="w-[200px] h-[30px]" />
                  )}

                  {route[route.length - 1] === "profile" &&
                  userData.first_name ? (
                    <img
                      src={profileEdit}
                      onClick={() => setEdit(true)}
                      className="w-3 h-3 cursor-pointer"
                      alt="follow"
                    />
                  ) : userData.first_name ? (
                    <img
                      src={userplus}
                      onClick={handleFollow}
                      className="w-3 h-3 cursor-pointer"
                      alt="follow"
                    />
                  ) : (
                    <LoadingPulse width={"30px"} height={"30px"} />
                  )}
                </div>

                <div
                  className={`${
                    userData.first_name
                      ? "flex gap-[10px]"
                      : "grid grid-cols-3 gap-[10px]"
                  }`}
                >
                  {userData.first_name ? (
                    <a href="https://www.instagram.com/">
                      <img src={instagram} alt="insta" />
                    </a>
                  ) : (
                    <LoadingPulse className="w-[30px] h-[30px]" />
                  )}
                  {userData.first_name ? (
                    <a href="https://www.facebook.com/">
                      <img src={facebook} alt="fb" />
                    </a>
                  ) : (
                    <LoadingPulse className="w-[30px] h-[30px]" />
                  )}
                  {userData.first_name ? (
                    <a href="https://www.twitter.com/">
                      <img src={twitter} alt="twitter" />
                    </a>
                  ) : (
                    <LoadingPulse className="w-[30px] h-[30px]" />
                  )}
                </div>
              </div>

              <p className="text-[12px] mt-[6px]">99 Followers</p>
              <p className="text-[12px] mt-[6px] mb-2 font-bold tracking-[1.25px] uppercase">
                Rock is my way of exploring music
              </p>

              <p className="text-[12px] w-1/2">
                {text.slice(0, details ? text.length - 1 : 200)}{" "}
                {!details && "..."}
                <br />
                <button
                  className="flex items-center gap-[6px] mt-1"
                  onClick={() => setDetails(!details)}
                >
                  {details ? (
                    <>
                      SHOW LESS{" "}
                      <img src={downArrowWhite} className="rotate-180" alt="" />
                    </>
                  ) : (
                    <>
                      SHOW MORE <img src={downArrowWhite} alt="" />
                    </>
                  )}
                </button>
              </p>
            </aside>
          </div>
        </div>
        <div className="w-3/12">
          <div className="flex items-center" id="album">
            <OwlCarousel
              className="owl-theme"
              loop={true}
              autoplay
              autoplayTimeout={3000}
              items={1}
              margin={10}
              // nav={true}
              dots={false}
            >
              <div className="item">
                {/* <div> */}
                <img src={amogh} alt="amogh" />
                <div className="text-button text-white text-center mt-[4px]">
                  Dummy Album
                </div>
                {/* </div> */}
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
            </OwlCarousel>
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

      <div className="my-2 px-[60px] mx-auto">
        <Songs />
      </div>

      {edit && <EditProfile handleClose={() => setEdit(false)} />}
    </div>
  );
};

export default Profile;
