import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import SongItem from "../Song/Song";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  console.log(songs);
  const { userData, token } = useContext(ProfileContext);

  useEffect(() => {
    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };

    if (userData && userData.isrc) {
      axios
        .get(backendUrl + "songs", config)
        .then(({ data }) => setSongs(data));
    }
  }, [userData.isrc]);

  return (
    <>
      {songs.map((song, key) => (
        <SongItem song={song} key={key} />
      ))}
    </>
  );
};

export default Songs;
