import React, { useContext, useEffect, useState } from "react";
import SongListItem from "../SongListItem/SongListItem";
import Button from "../Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../constants";
import { CiStreamOn } from "react-icons/ci";
import { VscLoading } from "react-icons/vsc";

const Uploads = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  console.log(songs);
  const { userData, token } = useContext(ProfileContext);

  useEffect(() => {
    const fetchSongs = async () => {
      console.log(!userData?.isrc);
      // If there's no ISRC, set loading false and return
      if (!userData?.isrc) {
        setIsLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            token: sessionStorage.getItem("token") || token,
          },
        };

        const response = await axios.get(
          `${backendUrl}songs/by-user-id/${userData["user-id"]}`,
          config
        );

        console.log(response.data);

        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setSongs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [userData?.isrc, userData?.["user-id"], token]);

  const renderContent = () => {
    // If no ISRC, show "no songs" message
    // if (!userData?.isrc) {
    //   return (
    //     <div className="flex justify-center items-center h-full">
    //       <VscLoading className="animate-spin text-heading-1 text-interactive-light" />
    //     </div>
    //   );
    // }

    // Show loading only when there's an ISRC and data is being fetched
    if (!userData.first_name || (userData.isrc && songs.length === 0)) {
      return (
        <div className="flex justify-center items-center h-full">
          <VscLoading className="animate-spin text-heading-1 text-interactive-light" />
        </div>
      );
    }

    // Show songs if they exist
    if (userData.isrc && songs.length > 0) {
      return (
        <div className="flex flex-col gap-2 h-fit overflow-y-auto pb-2">
          {songs.map((song, key) => (
            <SongListItem songData={song} key={key} {...song} />
          ))}
        </div>
      );
    }
    // if() {

    // }
    // Fallback if there are no songs but user has ISRC
    if (userData.first_name && !userData?.isrc?.length) {
      return (
        <div className="flex justify-center items-center h-full text-grey-dark text-heading-5">
          No songs found
        </div>
      );
    }
  };

  return (
    <div
      className={`bg-grey-light p-2 lg:p-4 rounded-2xl flex flex-col !h-[688px] text-grey-dark ${
        location.pathname === "/all-songs" ? "pb-0" : "justify-between"
      }`}
      id="song-list"
    >
      {location.pathname === "/all-songs" && (
        <h4 className="text-interactive-light text-heading-4-bold mb-4 flex gap-2 items-center">
          Streaming <CiStreamOn className="w-5 h-5" />
        </h4>
      )}

      {renderContent()}

      {location.pathname === "/" && (
        <div className="flex items-center justify-between">
          <h5 className="text-heading-6-bold lg:text-heading-4-bold text-grey-dark">
            Your Uploads
          </h5>

          <Button onClick={() => navigate("/revenue")} text="Visit Dashboard" />
        </div>
      )}
    </div>
  );
};

export default Uploads;
