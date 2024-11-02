import React, { useContext, useEffect, useState } from "react";
import AlbumDetails from "../../components/AlbumDetails/AlbumDetails";
import { ScreenContext } from "../../contexts/ScreenContext";
import AudioUI from "../../components/Audio/Audio";
import Platform from "../../components/Platform/Platform";
import Distribution from "../../components/Distribution/Distribution";
import { useLocation } from "react-router-dom";
import SongUploadProgress from "../../components/SongUploadProgress/SongUploadProgress";
import AlbumAudio from "../../components/AlbumAudio/AlbumAudio";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Preview from "../../components/Preview/Preview";
import { PlanContext } from "../../contexts/PlanContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const AlbumUpload = () => {
  const [initFormData, setInitFormData] = useState([
    {
      songName: "",
      isrc: "",
      artists: [
        { name: "", role: "Singer/Primary Artist" },
        { name: "", role: "Lyricist" },
        { name: "", role: "Composer" },
      ],
      selectedPlatforms: [],
      file: {},
      startMinutes: 0,
      startMinutes2: 0,
      startSeconds: 0,
      startSeconds2: 0,
      parentalAdvisory: false,
      instrumental: false,
      language: "",
    },
  ]);
  const [formData, setFormData] = useState({ songs: initFormData });
  const [screen, setScreen] = useState("albumDetails");
  const [artistCount, setArtistCount] = useState(0);
  const location = useLocation();
  const [modal, showModal] = useState(false);
  const { userData } = useContext(ProfileContext);
  // console.log(userData);
  useEffect(() => {
    setFormData({ songs: initFormData });
  }, [initFormData]);

  // console.log(formData);

  return (
    <div className="lg:w-11/12 ml-auto pt-5">
      <SongUploadProgress screen={screen} setScreen={setScreen} />
      <div className={`mt-5 px-5 py-6 shadow`}>
        <h4 className="text-heading-4-bold text-grey capitalize mb-4">
          Plan :{" "}
          {location.search.split("?")[1]?.includes("-")
            ? location.search.split("?")[1]?.split("-")?.join(" ")
            : location.search.split("?")[1]}
          {userData.yearlyPlanEndDate && "Yearly Plan"}
        </h4>

        {modal && (
          <Modal>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            culpa enim eligendi veritatis ipsam quas quis quaerat ipsa
            voluptates. Saepe corporis reprehenderit soluta magnam temporibus!
            Iste unde exercitationem quaerat ipsa?
          </Modal>
        )}
        <ScreenContext.Provider
          value={{ screen, setScreen, setFormData, formData }}
        >
          {screen === "albumDetails" ? <AlbumDetails /> : <></>}{" "}
          {screen === "audio" ? (
            <AlbumAudio
              artistCount={artistCount}
              setArtistCount={setArtistCount}
              setScreen={setScreen}
              setInitFormData={setInitFormData}
              initFormData={initFormData}
            />
          ) : (
            <></>
          )}
          {screen === "preview" ? <Preview /> : <></>}
          {screen === "platform" ? <Platform /> : <></>}{" "}
          {screen === "distribution" ? <Distribution /> : <></>}
        </ScreenContext.Provider>
      </div>
    </div>
  );
};

export default AlbumUpload;
