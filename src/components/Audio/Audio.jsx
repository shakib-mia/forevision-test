import React, { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import axios from "axios";
import { backendUrl, config } from "./../../constants";
import SelectOptions from "../SelectOptions/SelectOptions";
import CallerTuneTimeStamp from "../CallerTuneTimeStamp/CallerTuneTimeStamp";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Video from "../Video/Video";

const AudioUI = () => {
  const { setScreen, setFormData, formData } = useContext(ScreenContext);
  const [alreadyHaveIsrc, setAlreadyHaveIsrc] = useState(false);
  const [isrc, setIsrc] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [file, setFile] = useState({});
  const [audioDuration, setAudioDuration] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [startSeconds, setStartSeconds] = useState(0);
  // console.log(file.name);
  const languagesInIndia = [
    "Ahirani",
    "Arabic",
    "Assamese",
    "Awadhi",
    "Bengali",
    "Bhojpuri",
    "Chattisgarhi",
    "Dogri",
    "English",
    "Garhwali",
    "Garo",
    "Gujarati",
    "Haryanvi",
    "Himachali",
    "Hindi",
    "Instrumental",
    "Kannada",
    "Kashmiri",
    "Khasi",
    "kokborok",
    "Konkani",
    "kumauni",
    "Maithili",
    "Malayalam",
    "Mandarin",
    "Manipuri",
    "Marathi",
    "Marwari",
    "Naga",
    "Nagpuri",
    "Nepali",
    "Odia",
    "Punjabi",
    "Rajasthani",
    "Rajbongshi",
    "Sanskrit",
    "Tamil",
    "Telugu",
    "Urdu",
    "Tulu",
  ];

  // useEffect(() => {
  //   if (!alreadyHaveIsrc) {
  //     axios
  //       .get(backendUrl + "generate-isrc")
  //       .then(({ data }) => setIsrc(data.newIsrc));
  //   } else {
  //     setIsrc("");
  //   }
  // }, [alreadyHaveIsrc]);

  const handleAudioChange = (event) => {
    const file = event.target.files[0]; // Get the file
    setFile(file);
    if (file && file.type.startsWith("audio/")) {
      const audioUrl = URL.createObjectURL(file);
      setAudioUrl(audioUrl);
      const audio = new Audio(audioUrl);
      // console.log(audioUrl);
      audio.onloadedmetadata = () => {
        // Access audio duration here
        setAudioDuration(audio.duration);
        console.log(`Audio Duration: ${audio.duration} seconds`);
        // Perform any action with the duration here

        // Remember to revoke the created URL to avoid memory leaks
        URL.revokeObjectURL(audioUrl);
      };
      const formData = new FormData();

      formData.append("file", file);
      axios
        .post("http://localhost:5000/upload-song", formData, config)
        .then(({ data }) => setAudioUrl(data.songUrl));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setScreen("platform");
  };

  // const tracks = [
  //   {
  //     url: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
  //     title: "Madza - Chords of Life",
  //     tags: ["house"],
  //   },
  //   {
  //     url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
  //     title: "Madza - Late Night Drive",
  //     tags: ["dnb"],
  //   },
  //   {
  //     url: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
  //     title: "Madza - Persistence",
  //     tags: ["dubstep"],
  //   },
  // ];

  const handleDelete = (e) => {
    // console.log(audioUrl.split("/")[audioUrl.split("/").length - 1]);
    axios
      .post(
        "http://localhost:5000/upload-song/delete/" +
          audioUrl.split("/")[audioUrl.split("/").length - 1]
      )
      .then((res) => {
        if (res.status === 200) {
          setAudioUrl("");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-2 items-center">
        <InputField
          label={"Song Name"}
          onChange={(e) =>
            setFormData({ ...formData, songName: e.target.value })
          }
          required
          placeholder={"Name"}
        />
        <InputField
          label={"ISRC"}
          onChange={(e) => {
            setIsrc(e.target.value);
            setFormData({ ...formData, isrc });
          }}
          placeholder={"ISRC"}
          // required={alreadyHaveIsrc}
          // value={isrc}
          // disabled={!alreadyHaveIsrc}
        />
        {/* <div className="flex"></div> */}
        {/* <InputField
          type={"checkbox"}
          id={"alreadyHaveIsrc"}
          label={"I have my own ISRC"}
          containerClassName={"mt-4"}
          onChange={(e) => setAlreadyHaveIsrc(e.target.checked)}
        /> */}
      </div>

      <div className="grid grid-cols-3 gap-2 items-center mt-3">
        {/* <InputField type={"multi-select"} options={["yes", "no"]} /> */}
        <SelectOptions
          onChange={(e) =>
            setFormData({
              ...formData,
              parentalAdvisory: e.target.value === "yes" ? true : false,
            })
          }
          required={true}
          options={["no", "yes"]}
          placeholder={"Select..."}
          label={"Parent Advisory"}
        />
        <SelectOptions
          placeholder={"Select..."}
          options={["no", "yes"]}
          label={"Instrumental"}
          required={true}
          onChange={(e) =>
            setFormData({
              ...formData,
              instrumental: e.target.value === "yes" ? true : false,
            })
          }
        />
        <SelectOptions
          options={languagesInIndia}
          label={"Language"}
          placeholder={"Select..."}
          required={true}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
        />
        {/* <InputField type={"multi-select"} options={["yes", "no"]} /> */}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex gap-2 w-2/3">
          <InputField
            label={"Artist Name"}
            placeholder={"Artist Name"}
            note={"Artist's Name"}
            containerClassName={"w-full"}
            required={true}
            onChange={(e) =>
              setFormData({ ...formData, artistName: e.target.value })
            }
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
            required={true}
            label={"Select Role"}
          />
        </div>

        <Button
          containerClassName={"!rounded-none w-1/3"}
          className={"!rounded-none px-4 w-full text-center justify-center"}
          text={"+ Add Artist"}
        />
      </div>

      {/* {formData.songName?.length && ( */}
      <div className="mt-5 flex gap-3">
        <InputField
          type={"file"}
          accept={"audio/*"}
          label={"Upload"}
          onChange={handleAudioChange}
          disabled={!formData.songName}
          id={"audioUpload"}
          required={true}
          placeholder={file.name || "Select File"}
          containerClassName={"w-8/12"}
        />

        {/* {<Player trackList={tracks} />} */}

        {/* <InputField
          type={"text"}
          placeholder={"CRBT Cut"}
          label={"crbt"}
          labelClassName={"opacity-0"}
          containerClassName={"w-full"}
        /> */}
        {audioUrl.length > 0 && <AudioPlayer src={audioUrl} />}
        {/* <Video /> */}
      </div>
      {/* )} */}
      <CallerTuneTimeStamp
        setStartMinutes={setStartMinutes}
        setStartSeconds={setStartSeconds}
        audioDuration={audioDuration}
        startMinutes={startMinutes}
        startSeconds={startSeconds}
      />

      <div className="grid grid-cols-4 gap-3 mt-5 items-baseline">
        <SelectOptions
          placeholder={"Select The Primary Genre"}
          required={true}
          // onChange={(e) => console.log(e.target.value)}
          options={["Genre 1", "Genre 2", "Genre 3", "Genre 4", "Genre 5"]}
        />

        <SelectOptions
          placeholder={"Select The Secondary Genre"}
          required={true}
          // onChange={(e) => console.log(e.target.value)}
          options={["Genre 1", "Genre 2", "Genre 3", "Genre 4", "Genre 5"]}
        />

        <SelectOptions
          placeholder={"Select The Mood"}
          required={true}
          // onChange={(e) => console.log(e.target.value)}
          options={["Genre 1", "Genre 2", "Genre 3", "Genre 4", "Genre 5"]}
        />

        <InputField
          placeholder={"Description"}
          required={false}
          // labelClassName={"opacity-0"}
          label={" "}
        />
      </div>

      <div className="flex gap-4 items-center mt-4">
        <aside className="w-2/3 flex items-baseline gap-4">
          <div className="w-1/2">
            {/* <SelectOptions
              labelClassName={"font-medium text-subtitle-2 !text-black"}
              label={"Publisher"}
              note={
                "If you don't have any you can use our name or you can create your own"
              }
              options={[
                "ForeVision digital",
                "ForeVision digital",
                "ForeVision digital",
              ]}
            /> */}
            <InputField
              type={"date"}
              required={true}
              label={" "}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              note={"Date of Music Release"}
            />
          </div>
          <div className="w-1/2">
            <InputField
              type={"date"}
              required={true}
              label={" "}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              note={"Go Live Date"}
            />
          </div>
          {/* </div> */}
        </aside>

        <aside className="w-1/3">
          <InputField
            type={"time"}
            label={" "}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            note={"Go Live Time"}
          />
        </aside>
      </div>

      <Button
        type={"submit"}
        containerClassName={"w-fit mx-auto mt-5"}
        onClick={() => {
          setScreen("platform");
        }}
        text={"Save and Next"}
      />

      {/* <Button type={"destructive"} text={"delete"} onClick={handleDelete} /> */}
    </form>
  );
};

export default AudioUI;
