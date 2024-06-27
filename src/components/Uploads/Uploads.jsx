import React, { useContext, useEffect, useState } from "react";
import SongListItem from "../SongListItem/SongListItem";
import Button from "../Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../constants";

const Uploads = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);

  const { userData } = useContext(ProfileContext);

  useEffect(() => {
    // const isrcs = userData?.isrc?.split(",");
    if (userData && userData.isrc) {
      axios
        .post("http://localhost:5100/songs", { isrc: userData?.isrc }, config)
        .then(({ data }) => setSongs(data));
    }
  }, [userData.isrc]);

  return (
    <div
      className="bg-grey-light p-4 rounded-2xl flex flex-col justify-between !h-[590px]"
      id="song-list"
    >
      <div className="flex flex-col gap-2 h-fit overflow-y-auto">
        {songs.map(({ Song }) => (
          <SongListItem name={Song} />
        ))}
      </div>

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

      <div className="flex items-center justify-between">
        <h5 className="text-heading-4-bold text-grey-dark">Your Uploads</h5>

        <Button
          onClick={() => navigate("/revenue")}
          text="Visit Dashboard"
        ></Button>
      </div>
    </div>
  );
};

export default Uploads;
