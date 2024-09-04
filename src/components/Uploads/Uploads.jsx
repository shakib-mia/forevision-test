import React, { useContext, useEffect, useState } from "react";
import SongListItem from "../SongListItem/SongListItem";
import Button from "../Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../constants";
import { RiEditBoxLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import { CiStreamOn } from "react-icons/ci";

const Uploads = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const location = useLocation();

  const { userData, token } = useContext(ProfileContext);

  useEffect(() => {
    // const isrcs = userData?.isrc?.split(",");
    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };
    if (userData && userData.isrc) {
      axios
        .get(backendUrl + "songs/" + userData["user-id"])
        .then(({ data }) => setSongs(data));
    }
  }, [userData.isrc]);

  // console.log(songs);

  return (
    <div
      className={`bg-grey-light p-4 rounded-2xl flex flex-col justify-between !h-[590px] text-grey-dark ${
        location.pathname === "/all-songs" && "pb-0"
      }`}
      id="song-list"
    >
      {location.pathname === "/all-songs" && (
        <h4 className="text-interactive-light text-heading-4-bold mb-4 flex gap-2 items-center">
          Streaming <CiStreamOn className="w-5 h-5" />
        </h4>
      )}
      {/* <div className="grid grid-cols-3 text-center">
        <aside>Song Name</aside>
        <aside>Status</aside>
        <aside>Action</aside>
      </div> */}
      {songs.length > 0 ? (
        <div className="flex flex-col gap-2 h-fit overflow-y-auto pb-2">
          {songs.map((song, key) => (
            <SongListItem songData={song} key={key} {...song} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <VscLoading className="animate-spin text-heading-1 text-interactive-light" />
        </div>
      )}

      {/* <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        direction="vertical"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper> */}

      {location.pathname === "/" && (
        <div className="flex items-center justify-between">
          <h5 className="text-heading-4-bold text-grey-dark">Your Uploads</h5>

          <Button
            onClick={() => navigate("/revenue")}
            text="Visit Dashboard"
          ></Button>
        </div>
      )}
    </div>
  );
};

export default Uploads;
