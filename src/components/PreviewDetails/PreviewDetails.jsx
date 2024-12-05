import React, { useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlbumPreview from "../AlbumPreview/AlbumPreview";
import Button from "../Button/Button";
import { ScreenContext } from "../../contexts/ScreenContext";
import { backendUrl, config } from "../../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { ProfileContext } from "../../contexts/ProfileContext";

const PreviewDetails = ({ albumData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { setScreen } = useContext(ScreenContext);
  const location = useLocation();
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { token } = useContext(ProfileContext);

  const config = {
    headers: {
      token,
    },
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleUpdate = () => {
    albumData.update = false;
    console.log(albumData);
    axios.post(backendUrl + "edit-song", albumData, config).then(({ data }) => {
      if (data.insertedId.length > 0) {
        toast.success("Update Request Submitted");
        navigate("/");
      }
    });
  };

  const renderArtists = (artists) => (
    <ul className="mt-2 space-y-1">
      {artists?.map((artist, index) => (
        <li
          key={index}
          className="flex items-center text-paragraph-2 text-black-secondary"
        >
          <span className="font-medium">{artist.name}</span>
          <span className="mx-1">-</span>
          <span>{artist.role}</span>
          {artist.spotifyUrl && (
            <a
              href={artist.spotifyUrl}
              className="ml-2 text-primary hover:text-primary-light"
            >
              Spotify
            </a>
          )}
          {artist.appleArtist && (
            <a
              href={artist.appleArtist}
              className="ml-2 text-primary hover:text-primary-light"
            >
              Apple Music
            </a>
          )}
          {artist.facebookUrl && (
            <a
              href={artist.facebookUrl}
              className="ml-2 text-primary hover:text-primary-light"
            >
              Facebook
            </a>
          )}
        </li>
      ))}
    </ul>
  );

  const renderSongDetails = (song) => {
    // console.log(song);
    return (
      <div key={song?.isrc || "single"}>
        <div className="px-4 py-3">
          <h2 className="text-heading-6-bold text-black">{song.songName}</h2>
          <div className="mt-3 flex items-center">
            <button
              onClick={togglePlay}
              className="bg-interactive-light text-white px-3 py-2 rounded-md hover:bg-interactive-light-hover focus:outline-none focus:ring-2 focus:ring-interactive-light-focus focus:ring-opacity-50"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <audio
              ref={audioRef}
              src={song.songUrl || albumData.songUrl}
              className="ml-3"
            />
            <span className="ml-3 text-subtitle-2 text-black-secondary">
              Start Time: {song.startMinutes || albumData.startMinutes}:
              {(song.startSeconds || albumData.startSeconds)
                ?.toString()
                ?.padStart(2, "0")}{" "}
              - {song.startMinutes2 || albumData.startMinutes2}:
              {(song.startSeconds2 || albumData.startSeconds2)
                ?.toString()
                ?.padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="px-4 pb-2">
          <ul className="flex flex-col ">
            {song.artists?.map(({ name, role }) => (
              <li>
                {name} - {role}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 py-3 bg-surface-white-surface-2">
          <h2 className="text-heading-6-bold text-black">
            Additional Information
          </h2>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div>
              <span className="text-subtitle-2 text-black-secondary">
                ISRC:
              </span>{" "}
              <span className="text-subtitle-2-bold text-primary">
                {song.isrc || albumData.isrc}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-black-secondary">UPC:</span>{" "}
              <span className="text-subtitle-2-bold text-primary">
                {albumData.UPC}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-black-secondary">
                Publisher:
              </span>{" "}
              <span className="text-subtitle-2-bold text-primary">
                {albumData.publisher}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-black-secondary">
                Record Label:
              </span>{" "}
              <span className="text-subtitle-2-bold text-primary">
                {albumData.recordLabel}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-black-secondary">
                Content Type:
              </span>{" "}
              <span className="text-subtitle-2-bold text-primary">
                {albumData.contentType}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-black-secondary">
                Payment Status:
              </span>{" "}
              <span className="text-subtitle-2-bold text-primary">
                {song.status || albumData.status}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-black-secondary">
                Upload Time:
              </span>{" "}
              <span className="text-subtitle-2-bold text-primary">
                {song.time || albumData.time}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-black-secondary">
                User Email:
              </span>{" "}
              <span className="text-subtitle-2-bold text-primary">
                {song.userEmail || albumData.userEmail}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlatforms = (platforms) => (
    <div className="px-4 py-3">
      <h2 className="text-heading-6-bold text-black">Selected Platforms</h2>
      <ul className={`grid grid-cols-2 lg:grid-cols-8 gap-2 lg:gap-4`}>
        {platforms?.map((plat) => (
          <li
            className={`flex gap-2 justify-center lg:justify-normal transition items-center rounded-xl cursor-pointer p-2`}
            title={
              plat === "Meta" &&
              "Including FB & Instagram audio library, shorts, story and reels."
            }
            // onClick={() => handlePlatformSelection(plat)}
          >
            <img
              src={`${backendUrl}uploads/platforms/${
                plat === "Hungama"
                  ? "hungama-music"
                  : plat.includes(" ")
                  ? plat.split(" ").join("-").toLowerCase()
                  : plat.toLowerCase()
              }.png`}
              className={`w-3 h-3 lg:w-5 lg:h-5 transition object-contain mx-auto`}
              alt=""
            />
            {/* <h6 className="text-paragraph-2 font-bold lg:text-heading-6-bold text-grey-dark capitalize whitespace-nowrap">
              {plat}
            </h6> */}
          </li>
        ))}
      </ul>
    </div>
  );

  if (location.pathname === "/album-upload") {
    return <AlbumPreview albumData={albumData} />;
  }

  return (
    <div className="bg-surface-white-surface-1 min-h-screen lg:p-4 mx-auto w-full pb-7">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          className={`flex flex-col lg:flex-row ${
            location.pathname.includes("album") && "bg-surface-white-surface-2"
          }`}
        >
          <div className="w-full lg:w-1/4 ">
            <img
              className="object-cover w-full h-full aspect-square"
              src={albumData.artWork}
              alt={albumData.albumTitle}
            />
          </div>
          <aside className="w-full lg:w-3/4">
            <div className="p-3 lg:p-4">
              {/* <div className="uppercase tracking-wide text-subtitle-2-bold text-primary">
                {albumData.albumType}
              </div> */}
              <h1 className="lg:mt-2 text-heading-1-bold text-black">
                {albumData.songs ? albumData.albumTitle : albumData.songName}
              </h1>
              <p className="lg:mt-2 text-paragraph-1 text-black-tertiary">
                {albumData.description}
              </p>
              {!(albumData.songs && albumData.songs.length) ? (
                <div className="mt-1 lg:mt-3 grid grid-cols-2 gap-1 lg:gap-2">
                  <div>
                    <span className="text-subtitle-2 text-black-secondary">
                      Genre:
                    </span>{" "}
                    <span className="text-subtitle-2-bold text-primary">
                      {albumData.genre}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-2 text-black-secondary">
                      Sub-Genre:
                    </span>{" "}
                    <span className="text-subtitle-2-bold text-primary">
                      {albumData.subGenre}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-2 text-black-secondary">
                      Language:
                    </span>{" "}
                    <span className="text-subtitle-2-bold text-primary">
                      {albumData.language}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-2 text-black-secondary">
                      Mood:
                    </span>{" "}
                    <span className="text-subtitle-2-bold text-primary">
                      {albumData.mood}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-1 grid grid-cols-1 gap-1 lg:gap-2 text-heading-6">
                  <aside>
                    <span className="font-bold">UPC</span>: {albumData.UPC}
                  </aside>
                  <aside>
                    <span className="font-bold">Record Label</span>:{" "}
                    {albumData.recordLabel}
                  </aside>
                  <aside>
                    <span className="font-bold">Publisher</span>:{" "}
                    {albumData.publisher}
                  </aside>
                </div>
              )}
            </div>
            {albumData.songs ? (
              <></>
            ) : (
              <div className="px-4 py-3 bg-surface-white-surface-2">
                <h2 className="text-heading-6-bold text-black">Artists</h2>
                {renderArtists(
                  albumData.songs
                    ? albumData.songs[0]?.artists
                    : albumData.artists
                )}
              </div>
            )}
          </aside>
        </div>

        {albumData.songs
          ? // Album Logic
            albumData.songs.map((song) => renderSongDetails(song))
          : // Single Song Logic
            renderSongDetails(albumData)}

        {renderPlatforms(albumData.selectedPlatforms)}
      </div>

      <div className="flex justify-center mt-5">
        {location.pathname.includes("/edit") ? (
          <Button onClick={handleUpdate}>Confirm</Button>
        ) : (
          <Button onClick={() => setScreen("distribution")}>
            Proceed to Checkout
          </Button>
        )}
      </div>
    </div>
  );
};

export default PreviewDetails;
