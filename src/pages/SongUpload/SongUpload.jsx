import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";

const SongUpload = () => {
  const [newIsrc, setNewIsrc] = useState("");
  const [previouslyReleased, setPreviouslyReleased] = useState(false);
  const fields = [
    {
      placeholder: "UPC",
      name: "UPC",
      type: "text",
      note: "If you already have a UPC for this release, please add. If not, no problem, we'll create one for you.",
    },
    { placeholder: "Album", name: "Album", type: "text" },
    { placeholder: "Song Name", name: "Song", type: "text" },
    {
      placeholder: "ISRC",
      name: "ISRC",
      type: "text",
      value: newIsrc,
      disabled: true,
    },
    { placeholder: "Record Label", name: "Record Label", type: "text" },
    {
      placeholder: "Reporting Partner",
      name: "Reporting Partner",
      type: "text",
    },
    { placeholder: "Date of Release", name: "Date of Release", type: "text" },
    { placeholder: "Go Live Date", name: "Go Live Date", type: "text" },
    { placeholder: "ArtistName", name: "ArtistName", type: "text" },
    { placeholder: "Composer", name: "Composer", type: "text" },
    { placeholder: "Lyricist", name: "Lyricist", type: "text" },
    { placeholder: "Language", name: "Language", type: "text" },
    { placeholder: "Genre", name: "Genre", type: "text" },
    { placeholder: "Description", name: "Description", type: "text" },
    { placeholder: "Mood", name: "Mood", type: "text" },
    { placeholder: "Sub Category", name: "Sub Category", type: "text" },
  ];

  useEffect(() => {
    axios
      .get(backendUrl + "generate-isrc")
      .then(({ data }) => setNewIsrc(data.newIsrc));
  }, []);

  return (
    <div className="2xl:p-4 2xl:pl-7 mb-6 2xl:mb-0">
      <form className="flex flex-col w-full items-center">
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
              onChange={(e) => console.log(e.target.checked + "yes")}
            />{" "}
            <label htmlFor="yes">Yes</label>
            <br />
            <input
              type="radio"
              name="prev-Released"
              id="no"
              onChange={(e) => console.log(e.target.checked + "no")}
            />{" "}
            <label htmlFor="no">No</label>
          </aside>
        </div>

        <Button type={"submit"} text="submit"></Button>
      </form>
    </div>
  );
};

export default SongUpload;
