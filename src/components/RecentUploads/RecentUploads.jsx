import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import RecentUploadsItem from "../RecentUploadsItem/RecentUploadsItem";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const RecentUploads = () => {
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { userData, token } = useContext(ProfileContext);

  const [songs, setSongs] = useState([]);
  useEffect(() => {
    // if (location.pathname !== "/all-songs") {
    // const isrcs = userData?.isrc?.split(",");
    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };
    if (userData && userData.isrc) {
      axios
        .get(backendUrl + "recent-uploads", config)
        .then(({ data }) => setSongs(data));
    }
    // }
  }, [userData.isrc, update]);

  console.log(songs);

  return (
    <div
      className={`w-full bg-grey-light rounded-2xl p-4 pb-0 text-grey-dark relative ${
        location.pathname === "/" ? "h-[622px]" : "h-full"
      } overflow-y-auto`}
    >
      <h4 className="text-heading-4-bold">Recent Uploads</h4>
      <div className="flex flex-col gap-2 h-fit overflow-y-auto mt-4">
        {songs.map((song, key) => (
          <RecentUploadsItem
            {...song}
            key={key}
            setUpdate={setUpdate}
            update={update}
          />
        ))}
      </div>
      {location.pathname === "/" && (
        <div
          className={`${
            songs.length > 7 ? "sticky" : "absolute"
          } bottom-0 left-0 w-full bg-grey-light flex justify-center py-2`}
        >
          <Button onClick={() => navigate("/all-songs")}>View All Songs</Button>
        </div>
      )}
    </div>
  );
};

export default RecentUploads;
