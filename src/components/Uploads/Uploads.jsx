import React from "react";
import SongListItem from "../SongListItem/SongListItem";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const Uploads = () => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-grey-light p-4 rounded-2xl flex flex-col justify-between !h-[590px]"
      id="song-list"
    >
      <div className="flex flex-col gap-2 h-fit overflow-y-auto">
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="Smokin' till my lungs burn " />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
        <SongListItem name="peja meghe Bhalobasa" />
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
        <h5 className="text-heading-5-bold text-white">Your Uploads</h5>

        <Button onClick={() => navigate("/")} text="Visit Dashboard"></Button>
      </div>
    </div>
  );
};

export default Uploads;
