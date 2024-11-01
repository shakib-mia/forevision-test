import React, { useState, useRef, useContext } from "react";
import Button from "../Button/Button";
import { ScreenContext } from "../../contexts/ScreenContext";

const AlbumPreview = ({ albumData }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { setScreen } = useContext(ScreenContext);
  const audioRef = useRef(null);

  const togglePlay = (song) => {
    console.log(song);
    if (currentSong === song && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentSong(song);
      audioRef.current.src = song.songUrl; // In a real scenario, use the actual file URL
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-surface-white-surface-1 min-h-screen p-4">
      <div className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* <div className="md:flex-shrink-0"> */}
          <img
            className="w-full object-cover aspect-square"
            //   className="object-cover"
            src={albumData.artWork}
            alt={albumData.albumTitle}
          />
          {/* </div> */}
          <div className="p-2 lg:p-4 w-full lg:w-3/4">
            <div className="uppercase tracking-wide text-subtitle-2-bold text-primary">
              {albumData.albumType}
            </div>
            <h1 className="mt-2 text-heading-4-bold text-black">
              {albumData.albumTitle}
            </h1>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <span className="text-subtitle-2 text-black-secondary">
                  UPC:
                </span>{" "}
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
                  Upload Time:
                </span>{" "}
                <span className="text-subtitle-2-bold text-primary">
                  {albumData.time}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 lg:px-4 py-3 bg-surface-white-surface-2">
          <h2 className="text-heading-6-bold text-black">Songs</h2>
          {albumData.songs.map((song, index) => (
            <div key={index} className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="text-heading-6 text-black">{song.songName}</h3>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    ISRC:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {song.isrc}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Genre:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {song.genre}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Sub-Genre:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {song.subGenre}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Language:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {song.language || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Mood:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {song.mood}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Release Date:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {song.releaseDate}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Live Date:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {song.liveDate}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Instrumental:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {song.instrumental ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Parental Advisory:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {song.parentalAdvisory ? "Yes" : "No"}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-subtitle-1-bold text-black">Artists</h4>
                <ul className="mt-1 space-y-1">
                  {song.artists.map((artist, artistIndex) => (
                    <li
                      key={artistIndex}
                      className="text-paragraph-2 text-black-secondary"
                    >
                      <span className="font-medium">{artist.name}</span> -{" "}
                      <span>{artist.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3">
                <h4 className="text-subtitle-1-bold text-black">Description</h4>
                <p className="mt-1 text-paragraph-2 text-black-tertiary">
                  {song.description}
                </p>
              </div>
              <div className="mt-3 flex items-center">
                <button
                  onClick={() => togglePlay(song)}
                  className="bg-interactive-light text-white px-3 py-2 rounded-md hover:bg-interactive-light-hover focus:outline-none focus:ring-2 focus:ring-interactive-light-focus focus:ring-opacity-50"
                >
                  {currentSong === song && isPlaying ? "Pause" : "Play"}
                </button>
                {/* <span className="ml-3 text-subtitle-2 text-black-secondary">
                  Start Time: {song.startMinutes}:
                  {song.startSeconds.toString().padStart(2, "0")} -
                  {song.startMinutes2}:
                  {song.startSeconds2.toString().padStart(2, "0")}
                </span> */}
              </div>
            </div>
          ))}
          <audio ref={audioRef} className="hidden" />
        </div>

        <div className="px-4 py-3">
          <h2 className="text-heading-6-bold text-black">Selected Platforms</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {albumData?.selectedPlatforms?.map((platform, index) => (
              <Button key={index}>{platform}</Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Button onClick={() => setScreen("distribution")}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default AlbumPreview;
