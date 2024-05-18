import React, { useState, useEffect, useContext, useRef } from "react";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { ScreenContext } from "../../contexts/ScreenContext";
import play from "./../../assets/icons/play.webp";
import pause from "./../../assets/icons/pause.webp";
import sound from "./../../assets/icons/sound.webp";
import mute from "./../../assets/icons/muted.webp";

function AudioPlayer({ src }) {
  const { formData } = useContext(ScreenContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.4);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
    // console.log(volume);
  }, [volume]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    // nst handleProgress = (e) => {
    const progressElement = e.target; // This should refer to the progress bar element
    // console.log(e.clientX - progressElement.getBoundingClientRect().left);
    const containerWidth =
      e.clientX - progressElement.getBoundingClientRect().left; // Calculate the relative position
    // console.log((containerWidth * 100) / progressElement.offsetWidth);
    const percent = (containerWidth * 100) / progressElement.offsetWidth;
    // // const progress = e.target.value;
    // console.log(position);
    // console.log(audioRef.current.duration);
    audioRef.current.currentTime = (audioRef.current.duration * percent) / 100;
    // // console.log(audioRef.current.currentTime);
    // setProgress(percent);
  };

  const handleVolumeChange = (e) => {
    const progressElement = e.target; // This should refer to the progress bar element
    // console.log(e.clientX - progressElement.getBoundingClientRect().left);
    const containerWidth =
      e.clientX - progressElement.getBoundingClientRect().left; // Calculate the relative position
    // console.log(containerWidth * 100);
    const percent =
      Math.abs(containerWidth * 100) / progressElement.offsetWidth;

    audioRef.current.volume = Math.abs(percent) / 100;
    // console.log(percent );
    setVolume(percent);
  };

  const updateProgress = () => {
    // console.log(e);
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  // useEffect(() => {
  //   console.log(progress);
  // }, [progress]);

  return (
    <div className="w-4/12 p-3 bg-grey-light rounded-xl text-grey-dark">
      <div className="flex gap-4">
        {formData.albumArt && (
          <img
            src={URL.createObjectURL(formData.albumArt)}
            alt="album-art"
            className="w-1/5 aspect-square"
          />
        )}
        {/* </div> */}
        <aside className="w-2/3 flex flex-col justify-between">
          <audio ref={audioRef} src={src} onTimeUpdate={updateProgress}></audio>
          <aside>
            <h5 className="text-heading-5-bold">{formData.songName}</h5>
            <h6 className="text-heading-6-bold mt-2">{formData.artistName}</h6>
          </aside>
          <div className="my-2">
            <span onClick={togglePlayPause} className="cursor-pointer">
              {isPlaying && progress !== 100 ? <FaPause /> : <FaPlay />}
            </span>
          </div>
        </aside>
      </div>
      <div className="flex items-center gap-3 mt-2">
        {/* Progress */}
        <div
          className="progress-bar w-8/12 h-1 bg-grey relative overflow-visible rounded-full cursor-pointer"
          onClick={handleProgressChange}
        >
          <div
            className="absolute left-0 top-0 h-full bg-primary-light rounded-full pointer-events-none"
            style={{ width: `${progress}%` }}
          ></div>
          <div
            id="circle"
            className="w-2 h-2 rounded-full absolute bg-primary top-0 bottom-0 my-auto pointer-events-none"
            style={{
              // height: "20px",
              // width: "20px",
              // backgroundColor: "blue",
              // position: "absolute",
              left: `${progress - 3}%`,
              // width: `${progress}%`,
            }}
          ></div>
        </div>
        {/* Volume */}
        <div className="w-4/12 flex gap-1 items-center text-heading-6">
          {/* <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                // className="mt-4"
                value={volume}
                onChange={handleVolumeChange}
              /> */}
          {volume > 0 ? (
            <FaVolumeUp
              className="cursor-pointer"
              onClick={() => {
                setVolume(0);

                audioRef.current.volume = 0;
              }}
            />
          ) : (
            <FaVolumeMute
              className="cursor-pointer"
              onClick={() => {
                setVolume(40);
                audioRef.current.volume = 0.4;
              }}
            />
          )}
          <div
            className="w-full h-1 rounded-full bg-primary relative cursor-pointer"
            onClick={handleVolumeChange}
          >
            <div
              className="h-2 bg-primary-light rounded-full w-2 absolute top-0 bottom-0 m-auto cursor-pointer pointer-events-none"
              style={{ left: `${Math.abs(volume) - 5}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
