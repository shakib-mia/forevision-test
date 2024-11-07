import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "../../constants";
import { FaChevronLeft } from "react-icons/fa";

const SocialLinks = () => {
  const location = useLocation();
  const [userId, songId] = location.pathname
    .split("/")
    .slice(2, location.pathname.split("/").length);
  const [isEffectRun, setIsEffectRun] = useState(false);
  const [song, setSong] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEffectRun) {
      setIsEffectRun(true);
      axios
        .get(backendUrl + "songs/" + songId)
        .then(({ data }) => setSong(data));
    }
  }, [userId, songId]);

  const platforms = Object.keys(song).filter(
    (key) => typeof song[key] === "string" && song[key].includes("https")
  );

  return (
    <div className="py-7 flex justify-center">
      <div className="shadow-md p-3 text-grey-dark w-11/12 lg:w-1/4">
        {/* <img
          src="https://www.designevo.com/res/templates/thumb_small/black-banner-and-vinyl.webp"
          alt="dummy"
          className="mx-auto"
        /> */}
        <FaChevronLeft
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h4 className="text-heading-6-bold lg:text-heading-4-bold text-center">
          {song.Song}
        </h4>
        <h6 className="text-paragraph-1 lg:text-heading-6-bold text-grey mt-1 text-center">
          {song.ArtistName}
        </h6>

        <div className="mt-4">
          {platforms.map((item, key) => (
            <a
              href={song[item]}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 my-2 shadow-md lg:shadow-lg p-2 rounded hover:shadow transition"
            >
              <img
                src={`https://api.forevisiondigital.in/uploads/platforms/${item}.png`}
                alt={item}
                className="w-4 lg:w-5 aspect-square object-contain items-center"
                key={key}
              />

              <h6 className="text-heading-6-bold capitalize">
                {item.includes("-") ? item.split("-").join(" ") : item}
              </h6>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
