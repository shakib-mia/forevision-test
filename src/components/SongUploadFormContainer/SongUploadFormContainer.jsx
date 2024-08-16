import React, { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import AlbumDetails from "../AlbumDetails/AlbumDetails";
// import Audio from "../Audio/Audio";
import Platform from "../Platform/Platform";
import Distribution from "../Distribution/Distribution";
import AudioUI from "../Audio/Audio";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Preview from "../Preview/Preview";
import { PlanContext } from "../../contexts/PlanContext";

const SongUploadFormContainer = ({ screen, setScreen }) => {
  const [artistCount, setArtistCount] = useState(1);
  const location = useLocation();
  const { planStore } = useContext(PlanContext);

  const intiFormData = JSON.parse(localStorage.getItem("song-data"))?.artists
    ? JSON.parse(localStorage.getItem("song-data"))
    : location.pathname === "/song-upload"
    ? {
        artists: [
          { name: "", role: "Singer/Primary Artist" },
          { name: "", role: "Lyricist" },
          { name: "", role: "Composer" },
        ],
        selectedPlatforms: [],
        file: {},
      }
    : [
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
      ];

  const [formData, setFormData] = useState(intiFormData);

  // console.log(formData);

  // useEffect(() => {
  //   console.log(screen);
  // }, [screen]);

  const navigate = useNavigate();
  // console.log(planStore.price.toString().length);
  if (planStore.price?.toString()?.length === 0) {
    // navigate("/plans");
    return <Navigate to={"/plans"} state={{ from: location }} replace />;
  }

  return (
    <div className={`mt-5 px-2 lg:px-5 lg:py-6 lg:shadow`}>
      <ScreenContext.Provider
        value={{ screen, setScreen, setFormData, formData }}
      >
        {screen === "albumDetails" ? <AlbumDetails /> : <></>}{" "}
        {screen === "audio" ? (
          <AudioUI artistCount={artistCount} setArtistCount={setArtistCount} />
        ) : (
          <></>
        )}{" "}
        {screen === "preview" ? <Preview /> : <></>}{" "}
        {screen === "platform" ? <Platform /> : <></>}{" "}
        {screen === "distribution" ? <Distribution /> : <></>}
      </ScreenContext.Provider>
    </div>
  );
};

export default SongUploadFormContainer;
