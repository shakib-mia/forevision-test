import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import SongItem from "../Song/Song";
import { VscLoading } from "react-icons/vsc";
import { useLocation } from "react-router-dom";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  // console.log(songs);
  const { userData, token } = useContext(ProfileContext);
  const location = useLocation();
  console.log(userData);
  const userId = location.pathname.split("/")[2];
  // console.log();

  useEffect(() => {
    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };

    if (userId) {
      axios
        .get(backendUrl + "songs/by-user-id/" + userId, config)
        .then(({ data }) => setSongs(data));
    } else {
      // userData["user-id"];
      if (userData["user-id"]) {
        axios
          .get(backendUrl + "songs/by-user-id/" + userData["user-id"], config)
          .then(({ data }) => setSongs(data));
      }
    }
  }, [userData.isrc]);

  return (
    <>
      {songs.length > 0 ? (
        songs.map((song, key) => <SongItem song={song} key={key} />)
      ) : (
        <VscLoading className="animate-spin text-white text-heading-1 mx-auto" />
      )}
    </>
  );
};

export default Songs;
