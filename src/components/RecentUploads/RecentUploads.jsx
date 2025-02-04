import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import RecentUploadsItem from "../RecentUploadsItem/RecentUploadsItem";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Albums from "../Albums/Albums";

const RecentUploads = () => {
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("songs");

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
    if (userData) {
      axios
        .get(backendUrl + "recent-uploads", config)
        .then(({ data }) => setSongs(data));
    }
    // }
  }, [userData.isrc, update]);

  console.log(songs);

  return (
    <div className="w-full bg-grey-light rounded-2xl p-2 !pt-0 lg:p-4 pb-0 text-grey-dark relative h-[688px] overflow-auto">
      <div className="sticky top-0 left-0 bg-grey-light pt-2 lg:pt-4">
        <h5 className="text-heading-5-bold 2xl:text-heading-4-bold text-grey-dark mb-3">
          Recent Uploads
        </h5>
        <div className="relative flex w-fit mb-4 gap-3">
          {/* Tab Buttons */}
          <button
            className={`relative text-heading-6-bold px-0 pb-1 transition-all duration-300 ${
              activeTab === "songs" ? "text-primary" : "text-grey-dark"
            }`}
            onClick={() => setActiveTab("songs")}
          >
            Songs
            <span
              className={`absolute bottom-0 right-0 h-[2px] bg-primary transition-all duration-300 ${
                activeTab === "songs" ? "left-0" : "left-full"
              }`}
            ></span>
          </button>
          <button
            className={`relative text-heading-6-bold px-0 pb-1 transition-all duration-300 overflow-hidden ${
              activeTab === "albums" ? "text-primary" : "text-grey-dark"
            }`}
            onClick={() => setActiveTab("albums")}
          >
            Albums
            <span
              className={`absolute bottom-0  w-full h-[2px] bg-primary transition-all duration-300 ${
                activeTab === "albums" ? "left-0" : "-left-full"
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div
        className={`h-fit overflow-y-auto ${
          location.pathname === "/" ? "h-[622px]" : "h-full"
        }`}
      >
        {activeTab === "songs" && (
          <div className="flex flex-col gap-2">
            {songs
              .filter((item) => !item.songs)
              .map((song, key) => (
                <RecentUploadsItem
                  songData={song}
                  {...song}
                  key={key}
                  setUpdate={setUpdate}
                  update={update}
                />
              ))}
            {location.pathname === "/" && songs.length > 7 && (
              <div className="sticky bottom-0 left-0 w-full bg-grey-light flex justify-center py-2">
                <Button onClick={() => navigate("/all-songs")}>
                  View All Songs
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === "albums" && <Albums />}
      </div>
    </div>
  );
};

export default RecentUploads;
