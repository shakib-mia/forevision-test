import axios from "axios";
// import { backendUrl } from "../../constants";
import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
// import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { ScreenContext } from "../../contexts/ScreenContext";
import { useLocation } from "react-router-dom";
import PlatformSelectionItem from "../PlatformSelectionItem/PlatformSelectionItem";

const PlatformSelection = ({ selectedPlatforms, setSelectedPlatforms }) => {
  const [platforms, setPlatforms] = useState([]);
  const { token } = useContext(ProfileContext);
  const { setFormData, formData } = useContext(ScreenContext);
  const [selectedAll, setSelectedAll] = useState(false);
  const [checked, setChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // console.log(selectedPlatforms);
    setFormData({ ...formData, selectedPlatforms });
    // console.log(formData);
  }, [selectedPlatforms?.length, selectedPlatforms]);

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

  const handleSelectedPlatform = (e) => {
    if (checked) {
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
    if (checked) {
      setSelectedAll(
        selectedPlatforms?.length > 0 &&
          selectedPlatforms?.length === newPlatforms.length
      );
    }
  }, [selectedPlatforms, selectedPlatforms?.length, newPlatforms, checked]);

  // console.log();
  const freeLogic = location.search.length === 0;
  // console.log(platforms);
  const freePlatformsArray = platforms
    .find(({ platformType }) => platformType === "International")
    ?.platforms.filter(
      (item) =>
        item.cat_name === "Meta" ||
        item.cat_name === "TikTok" ||
        item.cat_name === "SnapChat" ||
        item.cat_name === "Triller"
    );

  const proLogic =
    (location.search.split("?")[1]?.includes("-")
      ? location.search.split("?")[1]?.split("-")?.join(" ")
      : location.search.split("?")[1]) === "forevision pro";

  const crbtLogic =
    (location.search.split("?")[1]?.includes("-")
      ? location.search.split("?")[1]?.split("-")?.join(" ")
      : location.search.split("?")[1]) === "forevision crbt";

  // const common
  const commonPlatforms = platforms.filter(
    ({ platformType }) =>
      platformType === "YouTube" || platformType === "Lyrics"
  );
  // console.log(commonPlatforms);

  const proPlatforms = platforms.filter(
    ({ platformType }) => platformType !== "Caller Tune"
  );

  // console.log(proPlatforms);

  // console.log(commonPlatforms);

  const crbtPlatforms = [
    ...platforms.filter(
      ({ platformType }) =>
        platformType !== "International" &&
        platformType !== "YouTube" &&
        platformType !== "Lyrics"
    ),
    ...commonPlatforms,
  ];

  const freePlatforms = [
    {
      platformType: "International",
      platforms: freePlatformsArray,
    },

    {
      platformType: [commonPlatforms[0]?.platformType],
      platforms: commonPlatforms[0]?.platforms.slice(0, 2),
    },
    commonPlatforms[1],
  ];
  // console.log(commonPlatforms[0]);

  const logicalPlatforms = proLogic
    ? proPlatforms
    : crbtLogic
    ? crbtPlatforms
    : freeLogic
    ? freePlatforms
    : platforms;
  // console.log(crbtPlatforms);

  // console.log(freePlatforms);

  return (
    <>
      <Button
        containerClassName={"w-fit ml-auto"}
        onClick={() => {
          setChecked(!checked);
          handleSelectedPlatform();
        }}
      >
        {checked ? "Select" : "Selected"} All
      </Button>
      {/* </label> */}

      {logicalPlatforms.map((item, key) => (
        <PlatformSelectionItem
          id={key}
          item={item}
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
        />
      ))}
      {/* </ul> */}
    </>
  );
};

export default PlatformSelection;
