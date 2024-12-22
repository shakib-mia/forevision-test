import { AiFillDislike, AiFillLike } from "react-icons/ai";
import React, { useContext, useEffect, useState } from "react";
import { FaApple, FaChevronDown, FaMusic } from "react-icons/fa";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import EditSong from "../EditSong/EditSong";
import like from "../../assets/icons/like.webp";
import dislike from "../../assets/icons/dislike.webp";
import edit from "../../assets/icons/edit.webp";
import share from "../../assets/icons/share-nodes.webp";
import { RiEditBoxFill } from "react-icons/ri";
import { FaShareNodes } from "react-icons/fa6";

const SongItem = ({ song, isFirst, openSongId, setOpenSongId }) => {
  const [editId, setEditId] = useState("");
  const navigate = useNavigate();
  const { userData } = useContext(ProfileContext);
  const location = useLocation();

  const {
    Song,
    songName,
    jiosaavn,
    "wynk-music": wynk,
    gaana,
    spotify,
    "apple-music": apple,
    "amazon-music": amazon,
    _id,
  } = song;

  // Special styling for first item
  const firstItemStyles = isFirst
    ? {
        zIndex: 10,
        position: "relative",
      }
    : {};

  const isAccordionOpen = isFirst
    ? openSongId === "" || openSongId === _id
    : openSongId === _id;

  function hasLinkWithoutUrlOrArtWork(song) {
    console.log(song);
    // Iterate through the song object keys
    for (const key of Object.keys(song)) {
      const value = song[key]; // Get the value for each key
      console.log(`Key: ${key}, Value: ${value}`);

      // Check if the value includes a link and 'songUrl' or 'artWork' is missing
      if (
        typeof value === "string" &&
        value.includes("http") &&
        (!song.songUrl || !song.artWork)
      ) {
        return true; // Found a link without 'songUrl' or 'artWork'
      }
    }
    return false; // No invalid fields found
  }

  // useEffect(() => {
  //   hasLinkWithoutUrlOrArtWork(song);
  // }, []);

  return (
    <div
      className="lg:px-2 py-1"
      // className="border-b border-white lg:px-2 py-1"
      onClick={() => {
        setOpenSongId(isAccordionOpen ? "" : _id);
      }}
    >
      <div
        className="flex items-center justify-between py-[4px] lg:py-[11px]"
        style={firstItemStyles}
      >
        <div className="flex items-center gap-[4px] lg:gap-[12px]">
          <FaMusic className="text-white" />
          <h6 className="text-white lg:text-heading-6">{Song || songName}</h6>
        </div>

        <div className="flex gap-2">
          {/* Platform icons */}
          <div className="flex gap-2 items-center">
            {jiosaavn && (
              <a
                href={jiosaavn}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:opacity-80 transition-opacity z-20"
                style={{ display: "block" }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src="https://api.forevisiondigital.in/uploads/platforms/jiosaavn.png"
                  alt="JioSaavn"
                  className="w-2 lg:w-3"
                />
              </a>
            )}

            {wynk && (
              <a
                href={wynk}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:opacity-80 transition-opacity z-20"
                style={{ display: "block" }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src="https://api.forevisiondigital.in/uploads/platforms/wynk-music.png"
                  alt="Wynk"
                  className="w-2 lg:w-3"
                />
              </a>
            )}

            {gaana && (
              <a
                href={gaana}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:opacity-80 transition-opacity z-20"
                style={{ display: "block" }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src="https://api.forevisiondigital.in/uploads/platforms/gaana.png"
                  alt="Gaana"
                  className="w-2 lg:w-3"
                />
              </a>
            )}

            {spotify && (
              <a
                href={spotify}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:opacity-80 transition-opacity z-20"
                style={{ display: "block" }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src="https://api.forevisiondigital.in/uploads/platforms/spotify.png"
                  alt="Spotify"
                  className="w-2 lg:w-3"
                />
              </a>
            )}

            {apple && (
              <a
                href={apple}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:opacity-80 transition-opacity z-20"
                style={{ display: "block" }}
                onClick={(e) => e.stopPropagation()}
              >
                <FaApple className="text-white text-heading-5" />
              </a>
            )}

            {amazon && (
              <a
                href={amazon}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:opacity-80 transition-opacity z-20"
                style={{ display: "block" }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src="https://api.forevisiondigital.in/uploads/platforms/amazon-music.png"
                  alt="Amazon Music"
                  className="w-2 lg:w-3"
                />
              </a>
            )}

            {song["YouTube-Music"] && (
              <a
                href={song["YouTube-Music"]}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:opacity-80 transition-opacity z-20"
                style={{ display: "block" }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src="https://api.forevisiondigital.in/uploads/platforms/youtube-music.png"
                  alt="Amazon Music"
                  className="w-2 lg:w-3"
                />
              </a>
            )}
          </div>

          {/* Accordion Toggle Button (visible only on mobile) */}
          <button className="lg:hidden z-20">
            <FaChevronDown
              className={`transition-transform text-white ${
                (isFirst || isAccordionOpen) && openSongId === song._id
                  ? "rotate-180"
                  : "rotate-0"
              }`}
            />
          </button>

          {/* Action buttons for larger screens */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              className="cursor-pointer hover:opacity-80 transition-opacity z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <AiFillLike className="text-heading-6 text-white" />
            </button>
            <button
              className="cursor-pointer hover:opacity-80 transition-opacity z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <AiFillDislike className="text-heading-6 text-white" />
            </button>
            {location.pathname === "/profile" && (
              <button
                className="cursor-pointer hover:opacity-80 transition-opacity z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditId(_id);
                }}
              >
                <RiEditBoxFill className="text-heading-6 text-white" />
              </button>
            )}
            <button
              disabled={!hasLinkWithoutUrlOrArtWork(song)}
              className="cursor-pointer hover:opacity-80 transition-opacity z-20 disabled:opacity-25 disabled:cursor-not-allowed"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/share/${userData._id}/${_id}`);
              }}
            >
              <FaShareNodes className="text-heading-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Accordion for mobile view */}
      {/* {(isFirst || isAccordionOpen) && openSongId === song._id && ( */}
      <div
        className="lg:hidden flex justify-end gap-2 overflow-hidden transition-[height]"
        style={{
          height:
            (isFirst || isAccordionOpen) && openSongId === song._id
              ? "21.31px"
              : "0",
        }}
      >
        <button
          className="cursor-pointer hover:opacity-80 transition-opacity z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <AiFillLike className="text-heading-6 text-white" />
        </button>
        <button
          className="cursor-pointer hover:opacity-80 transition-opacity z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <AiFillDislike className="text-heading-6 text-white" />
        </button>
        <button
          className="cursor-pointer hover:opacity-80 transition-opacity z-20"
          onClick={(e) => {
            e.stopPropagation();
            setEditId(_id);
          }}
        >
          <RiEditBoxFill className="text-heading-6 text-white" />
        </button>
        <button
          disabled={!hasLinkWithoutUrlOrArtWork(song)}
          className="cursor-pointer hover:opacity-80 transition-opacity z-20 disabled:opacity-25 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/share/${userData._id}/${_id}`);
          }}
        >
          <FaShareNodes className="text-heading-6 text-white" />
        </button>
      </div>
      {/* )} */}

      {editId && <EditSong setEditId={setEditId} songData={song} />}
    </div>
  );
};

export default SongItem;
