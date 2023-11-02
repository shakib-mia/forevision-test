import React from "react";
import profile from '../../assets/images/artist-profile.webp';
import Button from "../../components/Button/Button";
import facebook from "./../../assets/icons/social/fb-black.webp";
import instagram from "./../../assets/icons/social/insta-black.webp";
import twitter from "./../../assets/icons/social/twitter-black.webp";
import accountBg from "./../../assets/images/account-bg.svg"
import SongListItem from "../../components/SongListItem/SongListItem";
// import bg from "./../../assets/images/dashboard-bg.webp";

const Home = () => {
  return (
    <div className="2xl:bg-grey-dark p-2 2xl:p-5 2xl:rounded-[20px] 2xl:m-4 2xl:ml-7">
      <div className="grid grid-cols-1 2xl:grid-cols-3 justify-between space-y-4 2xl:space-y-0 2xl:space-x-5">
        <div className="bg-white p-0 2xl:p-4 rounded-2xl">
          <div className="flex flex-col 2xl:flex-row items-center 2xl:items-end justify-center 2xl:justify-between">
            <img src={profile} className="rounded-full w-5/12 mb-0" alt="" />
            <div className="hidden 2xl:block text-center 2xl:text-left">
              <Button text="Visit Profile" small />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-center 2xl:justify-start gap-2 2xl:gap-3">
              <div className="flex gap-2 items-center">
                <h5 className="text-heading-5">
                  John Doe
                  <div className="border border-grey-dark hidden 2xl:block"></div>
                </h5>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="hidden 2xl:block" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19 3.17157C18.7599 3.17157 18.5222 3.21886 18.3003 3.31075C18.0785 3.40264 17.8769 3.53732 17.7071 3.7071L4.39491 17.0193L3.42524 20.5748L6.9807 19.6051L20.2929 6.29289C20.4627 6.1231 20.5974 5.92154 20.6893 5.69971C20.7812 5.47787 20.8284 5.24011 20.8284 5C20.8284 4.75988 20.7812 4.52212 20.6893 4.30029C20.5974 4.07845 20.4627 3.87689 20.2929 3.7071C20.1231 3.53732 19.9216 3.40264 19.6997 3.31075C19.4779 3.21886 19.2401 3.17157 19 3.17157ZM17.5349 1.46299C17.9994 1.27059 18.4973 1.17157 19 1.17157C19.5028 1.17157 20.0006 1.27059 20.4651 1.46299C20.9296 1.65539 21.3516 1.93739 21.7071 2.29289C22.0626 2.64839 22.3446 3.07043 22.537 3.53492C22.7294 3.99941 22.8284 4.49724 22.8284 5C22.8284 5.50275 22.7294 6.00058 22.537 6.46507C22.3446 6.92956 22.0626 7.3516 21.7071 7.7071L8.20713 21.2071C8.08407 21.3302 7.93104 21.419 7.76314 21.4648L2.26314 22.9648C1.91693 23.0592 1.54667 22.9609 1.29292 22.7071C1.03917 22.4534 0.940838 22.0831 1.03526 21.7369L2.53526 16.2369C2.58105 16.069 2.66986 15.9159 2.79292 15.7929L16.2929 2.29289C16.6484 1.93739 17.0705 1.65539 17.5349 1.46299Z" fill="#4B5563" />
                </svg>
              </div>

              <div className="flex gap-1 items-center">
                <img src={instagram} className="w-fit h-fit" alt="" />
                <img src={facebook} className="w-fit h-fit" alt="" />
                <img src={twitter} className="w-fit h-fit" alt="" />
              </div>

            </div>
            <p className="text-grey-dark my-1 text-center 2xl:text-left">99 Followers</p>
            <p className="text-button text-grey-dark uppercase mb-1">Rock is my way of exploring music </p>
            <p className="text-grey-dark text-subtitle-2">Archaeologists uncover the mythical city of Atlantis, but soon realize they are not alone in their discovery as supernatural forces threaten to destroy them ......</p>
          </div>
        </div>
        <div className="bg-grey-light 2xl:bg-white px-4 py-2 2xl:py-4 rounded-2xl relative overflow-hidden h-[392px] 2xl:h-auto">
          <img src={accountBg} className="absolute top-0 left-0 z-0 w-full" alt="" />
          <div className="absolute z-10 left-0 w-full">
            <h4 className="text-heading-4-bold ml-5 2xl:ml-4 text-white 2xl:text-grey">Account <br /> Balance</h4>
            <h4 className="text-heading-4-bold ml-5 2xl:ml-4 mt-5 2xl:mt-4 mb-5 text-grey-dark">20.69989967</h4>
            <div className="flex justify-center 2xl:justify-start 2xl:ml-4">
              <Button text="Request Withdraw"></Button>
            </div>
          </div>
        </div>
        <div className="bg-grey-light 2xl:bg-white p-4 rounded-2xl">
          <div className="flex flex-col gap-2">
            <SongListItem name="peja meghe borsha" />
            <SongListItem name="peja meghe borsha" />
            <SongListItem name="peja meghe borsha" />
          </div>

          <div className="flex mt-5 items-end">
            <h4 className="text-heading-4-bold text-grey">Your Uploads</h4>
            <div className="w-full">
              <Button text="Visit Profile"></Button>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col 2xl:flex-row mt-5 w-full gap-5 mb-7">
        <div className="w-full 2xl:w-1/2 bg-grey-light 2xl:bg-white rounded-2xl p-4 h-[392px]"></div>
        <div className="w-full 2xl:w-1/2 bg-grey-light 2xl:bg-white rounded-2xl p-4 h-[392px]"></div>
      </div>
    </div>
  );
};

export default Home;
