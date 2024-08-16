import React, { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import { FaApple, FaFacebook, FaInstagram, FaSpotify } from "react-icons/fa";
import SelectOptions from "../SelectOptions/SelectOptions";
import Button from "../Button/Button";
import { TbLinkMinus, TbLinkPlus } from "react-icons/tb";
import { ScreenContext } from "../../contexts/ScreenContext";
import { useLocation } from "react-router-dom";

const ArtistProfile = ({
  id,
  // handleArtistNameChange,
  // handleArtistRoleChange,
  handleRemoveArtist,
  artist,
  formId,
}) => {
  const { setScreen, setFormData, formData } = useContext(ScreenContext);
  const [showPlats, setShowPlats] = useState(false);
  const location = useLocation();
  // console.log(formData);

  // const handlePlatformUrl = (e, profile) => {
  //   console.log(
  //     location.pathname === "/album-upload"
  //       ? formData.songs[formId]
  //       : formData.artists[id]
  //   );
  //   // console.log(location.pathname === "/album-upload"? formData.songs[formId] : formData.artists[id]);
  //   const artistData =
  //     location.pathname === "/album-upload"
  //       ? formData.songs[formId]
  //       : formData.artists[id];
  //   artistData[profile] = e.target.value;
  //   setFormData(formData);
  //   // console.log(location.pathname === "/album-upload"? formData.songs[formId] : formData.artists);
  // };

  // console.log(artist);
  // console.log(formData.find);
  // console.log(formData);
  // const found = formData?.find((item) =>
  //   item.artists.find((ar) => ar.name === artist.name)
  // );
  let found;
  // console.log(formData);
  if (formData && location.pathname === "/album-upload") {
    console.log(formData);
    found = formData?.songs?.find((item) =>
      item?.artists?.find((ar) => ar.name === artist.name)
    );
  }

  // console.log(formData);

  const handleArtistNameChange = (index, value) => {
    if (location.pathname === "/album-upload") {
      formData.songs[formId].artists[index].name = value;
      setFormData({ ...formData });
    } else {
      formData.artists[index].name = value;
      setFormData({ ...formData });
    }
  };
  const handleArtistRoleChange = (index, value) => {
    if (location.pathname === "/album-upload") {
      formData.songs[formId].artists[index].role = value;
      setFormData({ ...formData });
    } else {
      formData.artists[index].role = value;
      setFormData({ ...formData });
    }
  };

  return (
    <div
      // id={id}
      className={`flex flex-col lg:flex-row gap-2 relative items-end ${
        id === 0 ? "" : "mt-4"
      }`}
    >
      <div className="w-full lg:w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-2 relative">
        <InputField
          label={"Artist Name"}
          placeholder={"Artist Name"}
          containerClassName={"w-full"}
          required={true}
          value={
            location.pathname === "/album-upload"
              ? formData.songs[formId]?.artists[id]?.name
              : formData.artists[id].name
          }
          onChange={(e) => {
            handleArtistNameChange(id, e.target.value);
          }}
        />
        <SelectOptions
          containerClassName={"w-full"}
          placeholder={"Select..."}
          options={[
            "Singer/Primary Artist",
            "Ft Artist",
            "Composer",
            "Lyricist",
            "Producer",
            "Star Cast",
          ]}
          value={
            location.pathname === "/album-upload"
              ? formData.songs[formId]?.artists[id]?.role
              : formData.artists[id].role
          }
          onChange={(e) => handleArtistRoleChange(id, e.target.value)}
          required={true}
          label={"Select Role"}
        />

        {id >= 3 && (
          <button
            className={
              "text-interactive-light-destructive text-heading-5-bold absolute -left-4 bottom-1"
            }
            // className="absolute bottom-2 -left-2 z-[99999999]"
            type="button"
            onClick={() => handleRemoveArtist(id)}
          >
            &times;
          </button>
        )}
      </div>

      <Button
        type={"button"}
        onClick={() => setShowPlats(!showPlats)}
        // onBlur={() => setShowPlats(false)}
        containerClassName={"w-full lg:w-1/3 h-fit"}
        className={"w-full flex gap-1 items-center justify-center"}
        title="Add Artist Profile"
      >
        {showPlats ? (
          <TbLinkMinus className="font-semibold text-heading-6-bold" />
        ) : (
          <TbLinkPlus className="font-semibold text-heading-6-bold" />
        )}
        Add Artist's Profile
      </Button>

      {showPlats && (
        <div className="flex flex-col gap-2 mt-3 w-full lg:w-2/3 absolute -bottom-[18rem] z-[99] bg-white shadow-xl p-3 rounded right-0">
          <div className="flex gap-2">
            <aside className="h-[42px] rounded aspect-square flex items-center">
              <FaSpotify className="text-heading-5 text-[#1db954]" />
            </aside>
            <InputField
              containerClassName={"w-full"}
              placeholder={"Spotify Artist Profile URL"}
              onChange={(e) => {
                // console.log(found.artists[id]);
                // if (found) {
                //   found.artists[id].spotifyUrl = e.target.value;
                //   setFormData({ ...found });
                //   console.log(found);
                // }

                location.pathname === "/album-upload"
                  ? (formData.songs[formId].artists[id].spotifyUrl =
                      e.target.value)
                  : (formData.artists[id].spotifyUrl = e.target.value);

                // console.log(formData);
              }}
              value={
                location.pathname === "/album-upload"
                  ? found?.artists[id].spotifyUrl
                  : formData.artists[id].spotifyUrl
              }
            />
          </div>
          <div className="flex gap-2">
            <aside className="h-[42px] rounded aspect-square flex items-center">
              <FaApple className="text-heading-5" />
            </aside>
            <InputField
              containerClassName={"w-full"}
              placeholder={"Apple Artist Profile URL"}
              onChange={(e) => {
                // const artists = [
                //   ...(location.pathname === "/album-upload"
                //     ? formData.songs[formId]
                //     : formData.artists),
                // ];
                // artists[id] = {
                //   ...artists[id],
                //   appleArtist: e.target.value,
                // };
                // setFormData({ ...formData, artists });
                location.pathname === "/album-upload"
                  ? (formData.songs[formId].artists[id].appleArtist =
                      e.target.value)
                  : (formData.artists[id].appleArtist = e.target.value);
              }}
              value={
                location.pathname === "/album-upload"
                  ? formData.songs[formId]?.artists[id]?.appleArtist
                  : formData.artists[id].appleArtist
              }
            />
          </div>
          <div className="flex gap-2">
            <aside className="h-[42px] rounded aspect-square flex items-center">
              <FaFacebook className="text-heading-5 text-[#0081fb]" />
            </aside>
            <InputField
              containerClassName={"w-full"}
              placeholder={"Facebook Artist Page URL"}
              onChange={(e) => {
                // const artists = [
                //   ...(location.pathname === "/album-upload"
                //     ? formData.songs[formId].artists
                //     : formData.artists),
                // ];
                // artists[id] = {
                //   ...artists[id],
                //   facebookUrl: e.target.value,
                // };
                // setFormData({ ...formData, artists });
                location.pathname === "/album-upload"
                  ? (formData.songs[formId].artists[id].facebookUrl =
                      e.target.value)
                  : (formData.artists[id].facebookUrl = e.target.value);
              }}
              value={
                location.pathname === "/album-upload"
                  ? formData.songs[formId].artists[id].facebookUrl
                  : formData.artists[id].facebookUrl
              }
            />
          </div>
          <div className="flex gap-2">
            <aside className="h-[42px] rounded aspect-square flex items-center">
              <FaInstagram className="text-heading-5" />
            </aside>
            <InputField
              containerClassName={"w-full"}
              placeholder={"Instagram Artist Profile URL"}
              onChange={(e) => {
                // const artists = [
                //   ...(location.pathname === "/album-upload"
                //     ? formData.songs[formId].artists[id].instagramUrl
                //     : formData.artists[id].instagramUrl),
                // ];
                // artists[id] = {
                //   ...artists[id],
                //   instagramUrl: e.target.value,
                // };
                location.pathname === "/album-upload"
                  ? (formData.songs[formId].artists[id].instagramUrl =
                      e.target.value)
                  : (formData.artists[id].instagramUrl = e.target.value);
                // console.log(formData.songs[formId].artists[id]);
                // setFormData({ ...formData, artists });
              }}
              value={
                location.pathname === "/album-upload"
                  ? formData.songs[formId].artists[id].instagramUrl
                  : formData.artists[id].instagramUrl
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfile;
