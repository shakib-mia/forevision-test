import React, { useEffect, useState } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import AlbumDetails from "../AlbumDetails/AlbumDetails";
// import Audio from "../Audio/Audio";
import Platform from "../Platform/Platform";
import Distribution from "../Distribution/Distribution";
import AudioUI from "../Audio/Audio";
import { useLocation } from "react-router-dom";

const SongUploadFormContainer = ({ screen, setScreen }) => {
  const [artistCount, setArtistCount] = useState(1);
  const location = useLocation();

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

  return (
    <div className={`mt-5 px-5 py-6 shadow`}>
      <ScreenContext.Provider
        value={{ screen, setScreen, setFormData, formData }}
      >
        {screen === "albumDetails" ? <AlbumDetails /> : <></>}{" "}
        {screen === "audio" ? (
          <AudioUI artistCount={artistCount} setArtistCount={setArtistCount} />
        ) : (
          <></>
        )}{" "}
        {screen === "platform" ? <Platform /> : <></>}{" "}
        {screen === "distribution" ? <Distribution /> : <></>}
      </ScreenContext.Provider>
    </div>
  );
};

export default SongUploadFormContainer;
