import axios from "axios";
import { backendUrl, config } from "../../constants";
import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import InputField from "../InputField/InputField";

const PlatformSelection = ({ selectedPlatforms, setSelectedPlatforms }) => {
  const [platforms, setPlatforms] = useState([]);
  const { token } = useContext(ProfileContext);
  const [selectedAll, setSelectedAll] = useState(false);

  useEffect(() => {
    // console.log(config);
    const config = {
      headers: { token: sessionStorage.getItem("token") || token },
    };
    axios
      .get("https://api.forevisiondigital.in/platforms", config)
      .then(({ data }) => {
        setPlatforms(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log(platforms);
  const [newPlatforms, setNewPlatforms] = useState([]);

  useEffect(() => {
    if (platforms.length > 0) {
      const tempNewPlatforms = [];
      for (const platform of platforms) {
        for (const { cat_name } of platform.platforms) {
          tempNewPlatforms.push(cat_name); // Add items to the temporary array
        }
      }
      setNewPlatforms(tempNewPlatforms); // Update state with the complete list
    }
  }, [platforms]);

  // console.log(newPlatforms);

  // console.log(handle);
  const handleSelectedPlatform = (e) => {
    if (e.target.checked) {
      let newSelectedPlatforms = []; // Initialize a temporary array

      for (const platform of platforms) {
        for (const { cat_name } of platform.platforms) {
          newSelectedPlatforms.push(cat_name); // Add items to the temporary array
        }
      }

      setSelectedPlatforms(newSelectedPlatforms); // Update state once with the complete list
      console.log(newSelectedPlatforms); // This should now reflect the full list of added items
    } else {
      setSelectedPlatforms([]);
    }
  };

  useEffect(() => {
    setSelectedAll(selectedPlatforms.length === newPlatforms.length);
  }, [selectedPlatforms, selectedPlatforms.length, newPlatforms]);

  // console.log(selectedPlatforms.length === newPlatforms.length);
  return (
    <>
      {/* <ul className="grid grid-cols-4 gap-3 gap-y-4"> */}
      {/* {platforms.length ? (
          platforms.map((item) => (
            <li
              className={`flex gap-2 transition items-center rounded-xl cursor-pointer p-2 ${
                selectedPlatforms.includes(item.cat_name)
                  ? "shadow-md"
                  : "shadow-none"
              }`}
              onClick={() =>
                selectedPlatforms.includes(item.cat_name)
                  ? setSelectedPlatforms(
                      selectedPlatforms.filter((it) => it !== item.cat_name)
                    )
                  : setSelectedPlatforms([...selectedPlatforms, item.cat_name])
              }
            >
              <img
                src={item.cat_image}
                className={`w-6 h-fit transition ${
                  selectedPlatforms.includes(item.cat_name)
                    ? "grayscale-0"
                    : "grayscale"
                }`}
                alt=""
              />
              <h6 className="text-heading-6-bold text-grey-dark">
                {item.cat_name}
              </h6>
            </li>
          ))
        ) : (
          <>Loading...</>
        )} */}

      <label className="flex justify-end items-center cursor-pointer">
        <InputField
          itemChecked={selectedPlatforms.length === newPlatforms.length}
          type={"checkbox"}
          onChange={handleSelectedPlatform}
        />{" "}
        {/* <input
          type="checkbox"
          checked={selectedPlatforms.length === 13}
          onChange={handleSelectedPlatform}
        /> */}
        Select All
      </label>

      {platforms.map((item, key) => (
        <div className={key > 0 && "mt-6"}>
          <h5 className="text-heading-5-bold text-center mb-3 text-grey-dark">
            {item.platformType}{" "}
            {item.platformType === "Caller Tune" ? "Partners" : "Platforms"}
          </h5>
          <ul className="grid grid-cols-4 gap-4">
            {item.platforms.map((plat) => (
              <li
                className={`flex gap-2 transition items-center rounded-xl cursor-pointer p-2 ${
                  selectedPlatforms.includes(plat.cat_name)
                    ? "shadow-md"
                    : "shadow-none"
                }`}
                onClick={() =>
                  selectedPlatforms.includes(plat.cat_name)
                    ? setSelectedPlatforms(
                        selectedPlatforms.filter((it) => it !== plat.cat_name)
                      )
                    : setSelectedPlatforms([
                        ...selectedPlatforms,
                        plat.cat_name,
                      ])
                }
              >
                <img
                  src={`${backendUrl}uploads/platforms/${
                    plat.cat_name === "Hungama"
                      ? "hungama-music"
                      : plat.cat_name.includes(" ")
                      ? plat.cat_name.split(" ").join("-").toLowerCase()
                      : plat.cat_name.toLowerCase()
                  }.png`}
                  className={`w-6 h-fit transition ${
                    selectedPlatforms.includes(plat.cat_name)
                      ? "grayscale-0"
                      : "grayscale"
                  }`}
                  alt=""
                />
                <h6 className="text-heading-6-bold text-grey-dark">
                  {plat.cat_name}
                </h6>
              </li>
            ))}
          </ul>
          {/* </h5> */}
        </div>
      ))}
      {/* </ul> */}
    </>
  );
};

export default PlatformSelection;
