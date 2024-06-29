import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import SongItem from "../Song/Song";

const Songs = () => {
  const [songs, setSongs] = useState([]);

  const { userData } = useContext(ProfileContext);

  useEffect(() => {
    // const isrcs = userData?.isrc?.split(",");
    if (userData && userData.isrc) {
      axios
        .post(backendUrl + "songs", { isrc: userData?.isrc }, config)
        .then(({ data }) => setSongs(data));
    }
  }, [userData.isrc]);

  return (
    <>
      {songs.map((props, key) => (
        <SongItem {...props} key={key} />
      ))}
    </>
  );
};

export default Songs;
