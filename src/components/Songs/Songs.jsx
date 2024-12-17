import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import SongItem from "../Song/Song";
import { VscLoading } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { valHooks } from "jquery";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [openSongId, setOpenSongId] = useState(songs[0]?._id); // To track which accordion is open
  const { userData, token } = useContext(ProfileContext);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  // const [detailedData, setDetailedData] = useState("")
  // console.log(openSongId);

  useEffect(() => {
    const fetchSongs = async () => {
      const config = {
        headers: {
          token: sessionStorage.getItem("token") || token,
        },
      };

      try {
        let response;
        if (userId) {
          response = await axios.get(
            `${backendUrl}songs/by-user-id/${userId}`,
            config
          );
        } else if (userData["user-id"]) {
          response = await axios.get(
            `${backendUrl}songs/by-user-id/${userData["user-id"]}`,
            config
          );
        }
        if (response?.data) {
          console.log(response?.data);
          if (typeof response?.data !== "string") {
            // Ensure each song has a unique key
            const processedSongs = response.data.map((song, index) => ({
              ...song,
              uniqueKey: song._id || `song-${index}`,
            }));
            setSongs(processedSongs);
            setOpenSongId(processedSongs[0]._id);
          }
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [userId, userData["user-id"], token]);

  if (songs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <VscLoading className="animate-spin text-white text-heading-1" />
      </div>
    );
  }

  const handleAccordionToggle = (songId) => {
    setOpenSongId(openSongId === songId ? null : songId); // Toggle accordion
  };

  return (
    <div className="songs-list divide-y divide-white">
      {songs.map((song, index) => (
        <SongItem
          key={song._id}
          song={song}
          isFirst={index === 0}
          openSongId={openSongId}
          setOpenSongId={setOpenSongId}
          isAccordionOpen={openSongId === song._id} // Pass the open state
          onToggleAccordion={() => handleAccordionToggle(song._id)} // Handle toggle
        />
      ))}
    </div>
  );
};

export default Songs;
