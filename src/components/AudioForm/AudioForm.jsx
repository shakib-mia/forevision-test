import React, { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import axios from "axios";
import { backendUrl, config } from "./../../constants";
import SelectOptions from "../SelectOptions/SelectOptions";
import CallerTuneTimeStamp from "../CallerTuneTimeStamp/CallerTuneTimeStamp";
import "@madzadev/audio-player/dist/index.css";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

import ArtistProfile from "../ArtistProfile/ArtistProfile";
import { fileToBase64 } from "../../utils/filetobase64";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation } from "react-router-dom";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const AudioForm = ({ setArtistCount, setCount, count }) => {
  const { setScreen, setFormData, formData } = useContext(ScreenContext);
  const { userData } = useContext(ProfileContext);
  const [done, setDone] = useState(false);
  const location = useLocation();
  // console.log(userData);
  // const [alreadyHaveIsrc, setAlreadyHaveIsrc] = useState(false);
  const [isrc, setIsrc] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [file, setFile] = useState({});
  const [audioDuration, setAudioDuration] = useState(0);
  // const [focused, setFocused] = useState(false);
  // const [showPlats, setShowPlats] = useState(false);
  const [genre, setGenre] = useState("Film");
  const [subGenreOptions, setSubGenreOptions] = useState([]);

  const handleArtistNameChange = (index, value) => {
    const updatedArtists = [...formData.artists];
    // console.log(updatedArtists);
    updatedArtists[index].name = value;

    setFormData({ ...formData, artists: updatedArtists });
  };

  const handleArtistRoleChange = (index, value) => {
    const updatedArtists = [...formData.artists];
    updatedArtists[index].role = value;
    // console.log(updatedArtists[index]);

    setFormData({ ...formData, artists: updatedArtists });
  };

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

  // console.log(formData);

  const handleAudioChange = async (event) => {
    const file = event.target.files[0]; // Get the file
    setFile(file);
    const data = await fileToBase64(file);
    setAudioUrl(data);
    // console.log(data);
    // sessionStorage.setItem("song", data);
    // console.log(file.filename);

    if (file && file.type.startsWith("audio/")) {
      // Create an object URL for the audio file
      const audioUrl = URL.createObjectURL(file);

      // Update the formData state with the file and audioUrl
      setFormData((prevFormData) => ({
        ...prevFormData,
        file,
      }));

      // Create a new Audio object to get the duration
      const audio = new Audio(audioUrl);

      // Wait for the audio metadata to load
      audio.onloadedmetadata = () => {
        const duration = audio.duration;
        setAudioDuration(duration);

        // Revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(audioUrl);

        // Append the file to FormData
        const fileData = new FormData();
        fileData.append("file", file);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setScreen("distribution");
    // localStorage.setItem("song-data", JSON.stringify(formData));
    // console.log(formData);
    formData.paymentStatus = "pending";
    formData.userEmail = userData.user_email;

    console.log(formData);

    const SongFile = new FormData();

    SongFile.append("file", formData.file);

    // Perform the file upload
    axios
      .post(backendUrl + "upload-song", SongFile, config)
      .then(({ data }) => {
        formData.songUrl = data.songUrl;
        setDone(true);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });

    delete formData.user_email;
    delete formData.audioUrl;
    delete formData.file;
    delete formData.status;
    // console.log(formData);
    // console.log();
    // document.getElementsByClassName("owl-next")[0].click();

    axios
      .post(backendUrl + "upload-song/upload-song-data", formData, config)
      .then(({ data }) => {
        if (data.acknowledged) {
          // setCount(count + 1);
          setScreen("distribution");
        }
      });
  };

  const handleRemoveArtist = (index) => {
    const updatedArtists = formData.artists.filter((_, i) => i !== index);
    setFormData({ ...formData, artists: updatedArtists });

    // console.log(updatedArtists);
  };
  /**
   *
   * {audioUrl.length > 0 && <AudioPlayer src={audioUrl} />}
   *
   *
   * */

  useEffect(() => {
    const options =
      genre === "Film"
        ? [
            "Devotional",
            "Dialogue",
            "Ghazal",
            "Hip-Hop/ Rap",
            "Instrumental",
            "Patriotic",
            "Remix",
            "Romantic",
            "Sad",
            "Unplugged",
          ]
        : genre === "Pop"
        ? [
            "Acoustic Pop",
            "Band Songs",
            "Bedroom Pop",
            "Chill Pop",
            "Contemporary Pop",
            "Country Pop/ Regional Pop",
            "Dance Pop",
            "Electro Pop",
            "Lo-Fi Pop",
            "Love  Songs",
            "Pop Rap",
            "Pop Singer-Songwriter",
            "Sad Songs",
            "Soft Pop",
          ]
        : genre === "Indie"
        ? [
            "Indian Indie",
            "Indie Dance",
            "Indie Folk",
            "Indie Hip-Hop",
            "Indie Lo-Fi",
            "Indie Pop",
            "Indie Rock",
            "Indie Singer -Songwriter",
          ]
        : genre === "Hip-Hop/Rap"
        ? [
            "Alternative Hip-Hop",
            "Concious Hip-Hop",
            "Country Rap",
            "Emo Rap",
            "Hip-Hop",
            "Jazz Rap",
            "Pop Rap",
            "Trap",
            "Trap Beats",
          ]
        : genre === "Folk"
        ? [
            "Ainchaliyan",
            "Alha",
            "Atulprasadi",
            "Baalgeet/ Children Song",
            "Banvarh",
            "Barhamasa",
            "Basant Geet",
            "Baul Geet",
            "Bhadu Gaan",
            "Bhagawati",
            "Bhand",
            "Bhangra",
            "Bhatiali",
            "Bhavageete",
            "Bhawaiya",
            "Bhuta song",
            "Bihugeet",
            "Birha",
            "Borgeet",
            "Burrakatha",
            "Chappeli",
            "Daff",
            "Dandiya Raas",
            "Dasakathia",
            "Deijendrageeti",
            "Deknni",
            "Dhamal",
            "Gadhwali",
            "Gagor",
            "Garba",
            "Ghasiyari Geet",
            "Ghoomar",
            "Gidda",
            "Gugga",
            "Hafiz Nagma",
            "Heliam",
            "Hereileu",
            "Hori",
            "Jaanapada Geethe",
            "Jaita",
            "Jhoori",
            "Jhora",
            "Jhumur",
            "Jugni",
            "Kajari",
            "Kajari/ Kajari /Kajri",
            "Karwa Chauth Songs",
            "Khor",
            "Koligeet",
            "Kumayuni",
            "Kummi Paatu",
            "Lagna Geet /Marriage Song",
            "Lalongeeti",
            "Lavani",
            "Lokgeet",
            "Loor",
            "Maand",
            "Madiga Dappu",
            "Mando",
            "Mapilla",
            "Naatupura Paadalgal",
            "Naqual",
            "Nati",
            "Nautanki",
            "Nazrulgeeti",
            "Neuleu",
            "Nyioga",
            "Oggu Katha",
            "Paani Hari",
            "Pai Song",
            "Pandavani",
            "Pankhida",
            "Patua Sangeet",
            "Phag Dance",
            "Powada",
            "Qawwali",
            "Rabindra Sangeet",
            "Rajanikantageeti",
            "Ramprasadi",
            "Rasiya",
            "Rasiya Geet",
            "Raslila",
            "Raut Nacha",
            "Saikuthi Zai",
            "Sana Lamok",
            "Shakunakhar-Mangalgeet",
            "Shyama Sangeet",
            "Sohar",
            "Sumangali",
            "Surma",
            "Suvvi paatalu",
            "Tappa",
            "Teej songs",
            "Tusu Gaan",
            "Villu Pattu",
          ]
        : genre === "Devotional"
        ? [
            "Aarti",
            "Bhajan",
            "Carol",
            "Chalisa",
            "Chant",
            "Geet",
            "Gospel",
            "Gurbani",
            "Hymn",
            "Kirtan",
            "Kirtan",
            "Mantra",
            "Mantra",
            "Paath",
            "Qawwals",
            "Shabd",
          ]
        : genre === "Hindustani Classical"
        ? ["Instrumental", "Vocal "]
        : genre === "Carnatic Classical"
        ? ["Instrumental", "Vocal"]
        : genre === "Ambient / Instrumental"
        ? ["Soft", "Easy Listening", "Electronic", "Fusion", "Lounge"]
        : [];

    setSubGenreOptions(options);
  }, [genre]);

  // console.log(formData);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <div className="w-2/3">
          <div className="grid grid-cols-2 gap-2 items-center">
            <InputField
              label={"Song Name"}
              onChange={(e) =>
                setFormData({ ...formData, songName: e.target.value })
              }
              required
              value={formData.songName}
              placeholder={"Name"}
            />
            <InputField
              label={"ISRC"}
              onChange={(e) => {
                setIsrc(e.target.value);
                setFormData({ ...formData, isrc: e.target.value });
              }}
              placeholder={"ISRC"}
              // required={alreadyHaveIsrc}
              value={formData.isrc}
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
              value={formData.parentalAdvisory ? "yes" : "no"}
              placeholder={"Select..."}
              label={"Parent Advisory"}
            />
            <SelectOptions
              placeholder={"Select..."}
              value={formData.instrumental ? "yes" : "no"}
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
              value={formData.language}
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

          <div className="mt-4 flex items-end gap-2">
            <aside className="w-full">
              {formData?.artists?.map((artist, key) => (
                <ArtistProfile
                  key={key}
                  id={key}
                  handleArtistNameChange={handleArtistNameChange}
                  handleArtistRoleChange={handleArtistRoleChange}
                  handleRemoveArtist={handleRemoveArtist}
                  artist={artist}
                />
              ))}
            </aside>
          </div>

          <Button
            containerClassName={
              "!rounded-none w-1/2 relative -bottom-[6px] mt-2"
            }
            className={
              "!rounded-none px-4 !py-[12px] w-full text-center justify-center border border-interactive-light"
            }
            text={"+ Add Artist"}
            type={"button"}
            onClick={() => {
              setArtistCount((c) => c + 1);
              formData.artists.push({ name: "", role: "" });
            }}
          />

          {/* <div className="mt-3 flex gap-3"> */}
          <InputField
            type={"file"}
            accept={"audio/mp3, audio/wav"}
            label={"Upload Audio"}
            onChange={handleAudioChange}
            disabled={!formData.songName}
            id={"audioUpload"}
            note={"Ensure your audio files are in WAV or MP3 formats only."}
            required={true}
            placeholder={formData.file?.name || "Select File"}
            containerClassName={"mt-3"}
          />

          {/* {<Player trackList={tracks} />} */}

          {/* <InputField
            type={"text"}
            placeholder={"CRBT Cut"}
            label={"crbt"}
            labelClassName={"opacity-0"}
            containerClassName={"w-full"}
          /> */}

          {/* <Video /> */}
          {/* </div> */}
        </div>
        <div className="w-1/3">{<AudioPlayer src={audioUrl} />}</div>
      </div>
      {/* {formData.songName?.length && ( */}

      {/* )} */}
      {(location.search.split("?")[1]?.includes("-")
        ? location.search.split("?")[1]?.split("-")?.join(" ")
        : location.search.split("?")[1]) !== "forevision pro" ? (
        <CallerTuneTimeStamp audioDuration={audioDuration} />
      ) : (
        <></>
      )}

      <div className="grid grid-cols-4 gap-3 mt-5 items-baseline">
        <SelectOptions
          placeholder={"Select The Primary Genre"}
          required={true}
          label={"Primary Genre"}
          name={"genre"}
          id={"genre"}
          value={formData.genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setFormData({ ...formData, genre: e.target.value });
          }}
          options={[
            "Film",
            "Pop",
            "Indie",
            "Hip-Hop/Rap",
            "Folk",
            "Devotional",
            "Hindustani Classical",
            "Carnatic Classical",
            "Ambient / Instrumental",
          ]}
        />

        <SelectOptions
          placeholder={"Select The Secondary Genre"}
          label={"Secondary Genre"}
          name={"subGenre"}
          id={"subGenre"}
          required={true}
          onChange={(e) =>
            setFormData({ ...formData, subGenre: e.target.value })
          }
          value={formData.subGenre}
          options={subGenreOptions}
        />

        <SelectOptions
          placeholder={"Select The Mood..."}
          label={"Mood"}
          required={true}
          value={formData.mood}
          onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
          // onChange={(e) => console.log(e.target.value)}
          options={[
            "Romantic",
            "Happy",
            "Sad",
            "Dance",
            "Bhangra",
            "Patriotic",
            "Nostalgic",
            "Inspirational",
            "Enthusiastic",
            "Optimistic",
            "Passion",
            "Pessimistic",
            "Spiritual",
            "Peppy",
            "Philosophical",
            "Mellow",
            "Calm",
          ]}
        />

        <InputField
          label={"Description"}
          placeholder={"Description"}
          required={false}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          // labelClassName={"opacity-0"}
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
              value={formData.releaseDate}
              onChange={(e) =>
                setFormData({ ...formData, releaseDate: e.target.value })
              }
              note={"Date of Music Release"}
            />
          </div>
          <div className="w-1/2">
            <InputField
              type={"date"}
              required={true}
              label={" "}
              value={formData.liveDate}
              onChange={(e) =>
                setFormData({ ...formData, liveDate: e.target.value })
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
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            note={"Go Live Time"}
          />
        </aside>
      </div>

      <div className="flex justify-center gap-4 items-center mt-3 mb-5">
        {/* <FaChevronCircleLeft
          className="text-heading-5 cursor-pointer"
          onClick={() => document.getElementsByClassName("owl-prev")[0].click()}
        /> */}
        <Button
          type={"submit"}
          // containerClassName={"mx-auto"}
          onClick={() => {
            console.log(formData);
            // setScreen("platform");
          }}
          disabled={done}
          text={"Save"}
        />
        {/* <FaChevronCircleRight
          className="text-heading-5 cursor-pointer"
          onClick={() => document.getElementsByClassName("owl-next")[0].click()}
        /> */}
      </div>

      {/* <Button type={"destructive"} text={"delete"} onClick={handleDelete} /> */}
    </form>
  );
};

export default AudioForm;
