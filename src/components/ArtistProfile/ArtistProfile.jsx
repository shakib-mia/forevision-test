import React, { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import { FaApple, FaFacebook, FaInstagram, FaSpotify } from "react-icons/fa";
import SelectOptions from "../SelectOptions/SelectOptions";
import Button from "../Button/Button";
import { TbLinkMinus, TbLinkPlus } from "react-icons/tb";
import { ScreenContext } from "../../contexts/ScreenContext";

const ArtistProfile = ({
  id,
  handleArtistNameChange,
  handleArtistRoleChange,
  handleRemoveArtist,
  artist,
}) => {
  const { setScreen, setFormData, formData } = useContext(ScreenContext);
  const [showPlats, setShowPlats] = useState(false);

  const handlePlatformUrl = (e, profile) => {
    console.log(formData.artists[id]);
    // console.log(formData.artists[id]);
    const artistData = formData.artists[id];
    artistData[profile] = e.target.value;
    setFormData(formData);
    // console.log(formData.artists);
  };

  return (
    <div
      // id={id}
      className={`flex gap-2 relative items-end ${id === 0 ? "" : "mt-4"}`}
    >
      <div className="w-11/12 grid grid-cols-2 gap-2 relative">
        <InputField
          label={"Artist Name"}
          placeholder={"Artist Name"}
          containerClassName={"w-full"}
          required={true}
          value={formData.artists[id].name}
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
          value={formData.artists[id].role}
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
        containerClassName={"w-1/3 h-fit"}
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
        <div className="flex flex-col gap-2 mt-3 w-2/3 absolute -bottom-[18rem] z-[99] bg-white shadow-xl p-3 rounded right-0">
          <div className="flex gap-2">
            <aside className="h-[42px] rounded aspect-square flex items-center">
              <FaSpotify className="text-heading-5 text-[#1db954]" />
            </aside>
            <InputField
              containerClassName={"w-full"}
              placeholder={"Spotify Artist Profile URL"}
              onChange={(e) => {
                const artists = [...formData.artists];
                artists[id] = {
                  ...artists[id],
                  spotifyUrl: e.target.value,
                };
                setFormData({ ...formData, artists });
              }}
              value={formData.artists[id].spotifyUrl}
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
                const artists = [...formData.artists];
                artists[id] = {
                  ...artists[id],
                  appleArtist: e.target.value,
                };
                setFormData({ ...formData, artists });
              }}
              value={formData.artists[id].appleArtist}
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
                const artists = [...formData.artists];
                artists[id] = {
                  ...artists[id],
                  facebookUrl: e.target.value,
                };
                setFormData({ ...formData, artists });
              }}
              value={formData.artists[id].facebookUrl}
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
                const artists = [...formData.artists];
                artists[id] = {
                  ...artists[id],
                  instagramUrl: e.target.value,
                };
                setFormData({ ...formData, artists });
              }}
              value={formData.artists[id].instagramUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfile;
