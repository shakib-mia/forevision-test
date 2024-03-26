import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";

const SongUploadForm = ({ index }) => {
  const [newIsrc, setNewIsrc] = useState("");
  const [previouslyReleased, setPreviouslyReleased] = useState(false);
  const [isrc, setIsrc] = useState("");
  const [updatedIsrc, setUpdatedIsrc] = useState(newIsrc);
  const fields = [
    {
      required: true,
      placeholder: "UPC",
      name: "UPC",
      type: "text",
      note: "If you already have a UPC for this release, please add. If not, no problem, we'll create one for you.",
    },
    { required: true, placeholder: "Album", name: "Album", type: "text" },
    { required: true, placeholder: "Song Name", name: "Song", type: "text" },
    {
      required: true,
      placeholder: "ISRC",
      name: "ISRC",
      type: "text",
      value: previouslyReleased ? isrc : updatedIsrc,
      disabled: !previouslyReleased,
      onChange: (e) => setIsrc(e.target.value),
    },
    {
      required: true,
      placeholder: "Record Label",
      name: "Record Label",
      type: "text",
    },
    {
      required: true,
      placeholder: "Reporting Partner",
      name: "Reporting Partner",
      type: "text",
    },
    {
      required: true,
      placeholder: "Date of Release",
      name: "Date of Release",
      type: "text",
    },
    {
      required: true,
      placeholder: "Go Live Date",
      name: "Go Live Date",
      type: "text",
    },
    {
      required: true,
      placeholder: "ArtistName",
      name: "ArtistName",
      type: "text",
    },
    { required: true, placeholder: "Composer", name: "Composer", type: "text" },
    { required: true, placeholder: "Lyricist", name: "Lyricist", type: "text" },
    { required: true, placeholder: "Language", name: "Language", type: "text" },
    { required: true, placeholder: "Genre", name: "Genre", type: "text" },
    {
      required: true,
      placeholder: "Description",
      name: "Description",
      type: "text",
    },
    { required: true, placeholder: "Mood", name: "Mood", type: "text" },
    {
      required: true,
      placeholder: "Sub Category",
      name: "Sub Category",
      type: "text",
    },
    {
      required: true,
      placeholder: "Sub Category",
      name: "song",
      type: "file",
      accept: ".wav",
    },
  ];

  const incrementIsrc = (isrc, index) => {
    // Correctly slice from the 7th character to the end to include all digits
    const numericPart = parseInt(isrc.slice(7), 10);
    const incrementedNumericPart = numericPart + index;

    // Concatenate and pad the numeric part as needed
    const result =
      isrc.slice(0, 7) + incrementedNumericPart.toString().padStart(5, "0");
    console.log(result);
    return result;
  };

  useEffect(() => {
    if (!previouslyReleased && newIsrc) {
      // Adjust based on your ISRC format and requirements
      const updatedIsrc = incrementIsrc(newIsrc, index);
      console.log(updatedIsrc);
      setUpdatedIsrc(updatedIsrc);
      //   setNewIsrc(updatedIsrc);
    }
  }, [newIsrc, index, previouslyReleased]);

  useEffect(() => {
    if (!previouslyReleased) {
      axios
        .get(backendUrl + "generate-isrc")
        .then(({ data }) => setNewIsrc(data.newIsrc));
    }
  }, [previouslyReleased]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [song] = e.target.song.files;
    const formData = new FormData();

    formData.append("file", song);
    // console.log(song);
    const { data } = await axios.post(
      backendUrl + "upload-song",
      formData,
      config
    );
    const { songUrl } = data;

    const songData = {};

    fields.map(({ name }) => (songData[name] = e.target[name].value));
    songData.songUrl = songUrl;
    delete songData.song;

    console.log(songData);
  };

  return (
    <form
      className="flex flex-col w-full items-center mt-3"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-4 w-full mb-4">
        {fields.map((item) => (
          <InputField {...item} />
        ))}

        <aside>
          <h6>Previously Released</h6>
          <input
            type="radio"
            name="prev-Released"
            id="yes"
            checked={previouslyReleased}
            onChange={(e) => setPreviouslyReleased(true)}
          />{" "}
          <label htmlFor="yes">Yes</label>
          <br />
          <input
            type="radio"
            name="prev-Released"
            id="no"
            checked={!previouslyReleased}
            onChange={(e) => setPreviouslyReleased(false)}
          />{" "}
          <label htmlFor="no">No</label>
        </aside>
      </div>

      <Button type={"submit"} text="submit"></Button>
    </form>
  );
};

export default SongUploadForm;
