import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa"; // React Icons
import { ProfileContext } from "../../contexts/ProfileContext";
import { backendUrl } from "../../constants";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [expandedAlbum, setExpandedAlbum] = useState(null); // State for active dropdown
  const { token } = useContext(ProfileContext);
  const navigate = useNavigate();

  const config = {
    headers: {
      token,
    },
  };

  useEffect(() => {
    axios
      .get(backendUrl + "recent-uploads/album", config)
      .then(({ data }) => setAlbums(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleDropdown = (albumId) => {
    setExpandedAlbum(expandedAlbum === albumId ? null : albumId);
  };

  const handleEdit = (albumId) => {
    // console.log(`Edit album with ID: ${albumId}`);
    navigate("/edit-album/" + albumId);
    // Add your navigation or edit logic here
  };

  const handlePayNow = (albumId) => {
    console.log(`Pay Now for album with ID: ${albumId}`);
    // Add your payment logic here
  };

  return (
    <div className="flex flex-col gap-4">
      {albums.map((album, key) => (
        <div
          key={key}
          className={`p-4 bg-grey-lighter rounded-xl shadow-sm flex flex-col gap-4 bg-white transition ${
            expandedAlbum ? "shadow" : "shadow-none"
          }`}
        >
          {/* Album Header: Clickable Image and Title */}
          <div className="flex items-center justify-between cursor-pointer">
            {/* Left: Image and Title */}
            <div
              className="flex items-center gap-4"
              onClick={() => toggleDropdown(album._id)}
            >
              <img
                src={album.artWork}
                alt={album.albumTitle}
                className="w-7 h-7 object-cover rounded-lg shadow-md"
              />
              <div>
                <h5 className="text-heading-5-bold">{album.albumTitle}</h5>
                <p className="text-sm text-grey-dark">
                  <strong>Status:</strong> {album.status || "No Status"}
                </p>
              </div>
            </div>

            {/* Right: Icons and Buttons */}
            <div className="flex items-center gap-2">
              {/* Edit Icon */}
              <button onClick={() => handleEdit(album._id)} title="Edit Album">
                <FaEdit size={18} />
              </button>

              {/* Pay Now Button */}
              <Button
                onClick={() => handlePayNow(album._id)}
                className="px-3 py-1"
              >
                Pay Now
              </Button>

              {/* Chevron */}
              <button className="text-primary">
                {expandedAlbum === album._id ? (
                  <FaChevronUp size={18} />
                ) : (
                  <FaChevronDown size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Dropdown Content */}
          {expandedAlbum === album._id && (
            <div className="p-4 bg-grey-lighter flex flex-col gap-2 border-t border-grey-light">
              {/* Songs List */}
              {album.songs.map((song, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p className="text-sm text-primary">
                    <strong>Song Name:</strong> {song.songName} ({song.status})
                  </p>
                  <p className="text-sm text-grey-dark">
                    <strong>Artists:</strong>{" "}
                    {song.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Albums;
