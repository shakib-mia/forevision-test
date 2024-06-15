import React from "react";
import { backendUrl } from "../../constants";

const PlatformSelectionItem = ({
  id,
  item,
  selectedPlatforms,
  setSelectedPlatforms,
}) => {
  const handlePlatformSelection = (plat) => {
    // if (plat.cat_name === "JioTunes") {
    //   console.log("jio saavn");
    // }
    if (selectedPlatforms?.includes(plat.cat_name)) {
      setSelectedPlatforms([
        ...selectedPlatforms?.filter((it) => it !== plat.cat_name),
      ]);

      // console.log(plat);
    } else {
      if (plat.cat_name === "JioTunes") {
        setSelectedPlatforms([...selectedPlatforms, plat.cat_name, "JioSaavn"]);
      } else if (plat.cat_name === "JioSaavn") {
        setSelectedPlatforms([...selectedPlatforms, plat.cat_name, "JioTunes"]);
      } else if (
        plat.cat_name === "Airtel" ||
        plat.cat_name === "Vi" ||
        plat.cat_name === "BSNL" ||
        plat.cat_name === "Wynk Music"
      ) {
        setSelectedPlatforms([
          ...selectedPlatforms,
          "Airtel",
          "Vi",
          "BSNL",
          "Wynk Music",
        ]);
      } else if (plat.cat_name === "YouTube Content ID") {
        setSelectedPlatforms([
          ...selectedPlatforms,
          plat.cat_name,
          "YouTube Music",
        ]);
      } else {
        setSelectedPlatforms([...selectedPlatforms, plat.cat_name]);
      }
    }
  };

  return (
    <div className={id > 0 && "mt-6"}>
      <h5 className="text-heading-5-bold text-center mb-3 text-grey-dark">
        {item?.platformType}{" "}
        {item?.platformType === "Caller Tune" ? "Partners" : "Platforms"}
      </h5>
      <ul className="grid grid-cols-4 gap-4">
        {item?.platforms?.map((plat) => (
          <li
            className={`flex gap-2 transition items-center rounded-xl cursor-pointer p-2 ${
              selectedPlatforms?.includes(plat.cat_name)
                ? "shadow-md"
                : "shadow-none"
            }`}
            onClick={() => handlePlatformSelection(plat)}
          >
            <img
              src={`${backendUrl}uploads/platforms/${
                plat.cat_name === "Hungama"
                  ? "hungama-music"
                  : plat.cat_name.includes(" ")
                  ? plat.cat_name.split(" ").join("-").toLowerCase()
                  : plat.cat_name.toLowerCase()
              }.png`}
              className={`w-5 h-fit transition ${
                selectedPlatforms?.includes(plat.cat_name)
                  ? "grayscale-0"
                  : "grayscale"
              }`}
              alt=""
            />
            <h6 className="text-heading-6-bold text-grey-dark capitalize">
              {plat.cat_name}
            </h6>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlatformSelectionItem;
