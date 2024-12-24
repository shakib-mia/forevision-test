import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "../../constants";
import { FaChevronLeft, FaLink } from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";

const SocialLinks = () => {
  const location = useLocation();
  const [userId, songId] = location.pathname
    .split("/")
    .slice(2, location.pathname.split("/").length);
  const [isEffectRun, setIsEffectRun] = useState(false);
  const [song, setSong] = useState({});
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

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

  console.log(window.location);

  return (
    <div className="py-7 pb-[256px] lg:pb-7 flex justify-center">
      <div className="shadow-md p-3 text-grey-dark w-11/12 lg:w-1/4">
        <FaChevronLeft
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <img
          src={
            song.artwork ||
            "https://api.forevisiondigital.in/uploads/art-work/file-1731994452207-1b_3000p.jpg"
          }
          alt="dummy"
          className="mx-auto my-1"
        />
        <h4 className="text-heading-6-bold lg:text-heading-4-bold text-center">
          {song.Song || song.songName}
        </h4>
        <h6 className="text-paragraph-1 lg:text-heading-6-bold text-grey mt-1 text-left">
          {<p className="text-center">{song.ArtistName}</p> || (
            <ul className="flex flex-col items-center gap-1 mt-2">
              {song.artists?.map((item, key) => (
                <li key={key}>
                  {item.role.includes("/")
                    ? item.role.split("/")[0]
                    : item.role}
                  : {item.name}
                </li>
              ))}
            </ul>
          )}
        </h6>

        <div className="mt-4">
          {platforms.map(
            (item, key) =>
              item === "YouTube-Topic" ||
              item === "Meta" || (
                <a
                  href={song[item]}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 my-2 shadow-md lg:shadow-lg p-2 rounded hover:shadow transition"
                >
                  <img
                    src={`https://api.forevisiondigital.in/uploads/platforms/${item.toLocaleLowerCase()}.png`}
                    alt={item}
                    className="w-4 lg:w-5 aspect-square object-contain items-center"
                    key={key}
                  />

                  <h6 className="text-heading-6-bold capitalize">
                    {item.includes("-") ? item.split("-").join(" ") : item}
                  </h6>
                </a>
              )
          )}
        </div>

        <CopyToClipboard
          text={window.location.href}
          data-tooltip-id={"copy"}
          onCopy={() => setCopied(true)}
          data-tooltip-content={copied ? "Copied" : "Copy Link To Clipboard"}
          className="cursor-pointer text-paragraph-1 focus:outline-none flex items-center justify-center w-full mt-2 py-2 rounded text-interactive-dark gap-2"
        >
          <div className="">
            <FaLink /> <button>Click to Get the Sharable Link</button>
          </div>
        </CopyToClipboard>
        <Tooltip id={"copy"} />
      </div>
    </div>
  );
};

export default SocialLinks;
