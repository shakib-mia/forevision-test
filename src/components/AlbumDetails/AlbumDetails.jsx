import React, { useContext, useState } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import Button from "../Button/Button";
// import InputField from "../InputField/InputField";
import SelectOptions from "../SelectOptions/SelectOptions";
import InputField from "../InputField/InputField";
import Modal from "../Modal/Modal";
import CreateRecordLabel from "../CreateRecordLabel/CreateRecordLabel";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import { useLocation } from "react-router-dom";
import { checkImageDimensions } from "../../utils/checkImageDimension";
import Swal from "sweetalert2";

const AlbumDetails = () => {
  const { setScreen, setFormData, formData } = useContext(ScreenContext);
  const { recordLabels } = useContext(ProfileContext);
  const [file, setFile] = useState({});
  const [filmBanner, setFilmBanner] = useState({});
  const [showRecordLabelForm, setShowRecordLabelForm] = useState(false);
  const location = useLocation();

  const handleDetailSubmit = () => {
    console.log(formData);
    if (file.name) {
      setScreen("platform");
      // setFileError(false)
    } else {
      // setFileError(true)
      // console.log();

      toast.error("File is empty", {
        position: "bottom-center",
      });
    }
  };

  const handleArtFileChange = async (e) => {
    setFile(e.target.files[0]);
    // setFormData({ ...formData, albumArt: e.target.files[0] });
    const albumArt = new FormData();
    const data = await checkImageDimensions(e.target.files[0], 3000, 3000);

    // console.log(data);
    if (data) {
      albumArt.append("file", e.target.files[0]);

      axios
        .post(backendUrl + "upload-art-work", albumArt)
        .then(({ data }) =>
          setFormData({ ...formData, artWork: data.artWorkUrl })
        );
    } else {
      // toast.error("Image size should be 3000x3000");
      Swal.fire({
        title: "Size mismatch!",
        html: `
          Image size should be 3000&times;3000
        `,
        icon: "error",
        confirmButtonText: "Got It",
      });
    }
  };

  const handleBannerFileChange = async (e) => {
    setFilmBanner(e.target.files[0]);
    // console.log(filmBanner.name);
    // setFormData({ ...formData, albumArt: e.target.files[0] });
    const albumArt = new FormData();

    albumArt.append("file", e.target.files[0]);

    axios
      .post(backendUrl + "upload-film-banner", albumArt, config)
      .then(({ data }) =>
        setFormData({ ...formData, filmBanner: data.artWorkUrl })
      );
  };

  // alert(location.pathname);

  return (
    <div className="pb-7">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
        <aside className="w-full lg:w-2/3">
          <SelectOptions
            placeholder={"Select..."}
            label={"Content Type"}
            onChange={(e) =>
              setFormData({ ...formData, contentType: e.target.value })
            }
            name={"contentType"}
            required
            options={["Album", "Film"]}
            value={formData.contentType}
          />
        </aside>
        <aside className="w-full lg:w-1/3">
          <InputField
            type={"number"}
            required={false}
            id={"upc"}
            name={"upc"}
            // labelClassName={"opacity-0"}
            placeholder={"UPC"}
            value={formData.UPC}
            label={" "}
            onChange={(e) => {
              setFormData({ ...formData, UPC: e.target.value });
              console.log(formData);
            }}
            note={
              "If you have one put it here, if you don't one will be provided"
            }
          />
        </aside>
      </div>

      {formData.contentType === "Film" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mt-2">
          <InputField
            type={"file"}
            id={"filmBanner"}
            required
            name={"filmBanner"}
            accept={"image/*"}
            placeholder={filmBanner?.name || "Film Banner"}
            // value={filmBanner.name}
            onChange={handleBannerFileChange}
          />
          <InputField
            required
            name={"filmProducer"}
            type={"text"}
            placeholder={"Film Producer"}
            onChange={(e) =>
              setFormData({ ...formData, filmProducer: e.target.value })
            }
          />
          <InputField
            required
            name={"actor"}
            type={"text"}
            placeholder={"Actor"}
            onChange={(e) =>
              setFormData({ ...formData, actor: e.target.value })
            }
          />
          <InputField
            required
            name={"director"}
            type={"text"}
            placeholder={"Director"}
            onChange={(e) =>
              setFormData({ ...formData, director: e.target.value })
            }
          />
          <InputField
            required
            name={"movieReleaseDate"}
            type={"date"}
            label={"Movie Release Date"}
            onChange={(e) =>
              setFormData({ ...formData, movieReleaseDate: e.target.value })
            }
          />
        </div>
      )}

      <div className="flex gap-2 lg:gap-4 flex-col lg:flex-row items-baseline">
        <aside className="w-full lg:w-2/3 flex flex-col lg:flex-row items-baseline gap-2 lg:gap-4">
          {/* <SelectOptions label={"Content Type"} options={[1, 2, 3, 4]} /> */}
          {/* <div className="flex items-baseline"> */}
          <div className="w-full lg:w-1/2">
            <InputField
              name={"title"}
              label={" "}
              placeholder={"Title"}
              note={"Album title"}
              required={true}
              // labelClassName={"opacity-0"}
              value={formData.albumTitle}
              onChange={(e) =>
                setFormData({ ...formData, albumTitle: e.target.value })
              }
            />
          </div>
          <div className="w-full lg:w-1/2">
            <SelectOptions
              placeholder={"Select..."}
              // labelClassName={"opacity-0"}
              required={true}
              name={"albumType"}
              label={" "}
              note={"Album Type"}
              options={
                location.pathname === "/album-upload"
                  ? ["Album", "Compilation", "Remix"]
                  : ["Album", "Single", "Compilation", "Remix"]
              }
              value={formData.albumType}
              onChange={(e) =>
                setFormData({ ...formData, albumType: e.target.value })
              }
            />
          </div>
          {/* </div> */}
        </aside>
        <aside className="w-full lg:w-1/3">
          <InputField
            type={"file"}
            // labelClassName={"opacity-0"}
            id={"album-art"}
            name={"albumArt"}
            value={formData.albumArt}
            onChange={handleArtFileChange}
            required={true}
            placeholder={file?.name || "Album Art"}
            accept={".jpg"}
            label={" "}
            note={
              "Ensure that your artwork is in the dimensions of 3000×3000 pixels and in .jpg format only."
            }
          />
        </aside>
      </div>

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center mt-4">
        <aside className="w-full lg:w-2/3 flex items-baseline gap-2 lg:gap-4">
          <div className="w-full">
            <SelectOptions
              labelClassName={"font-medium text-subtitle-2 !text-black"}
              placeholder={"Select..."}
              required={true}
              label={"Record Label"}
              value={formData.recordLabel}
              name={"recordLabel"}
              note={
                "If you don't have any you can use our name or you can create your own"
              }
              onChange={(e) =>
                setFormData({ ...formData, recordLabel: e.target.value })
              }
              options={recordLabels}
            />
          </div>
          {/* </div> */}
        </aside>
        <aside className="w-full lg:w-1/3">
          {/* <InputField
            type={"file"}
            // labelClassName={"opacity-0"}
            id={"album-art"}
            onChange={(e) => setFile(e.target.files[0])}
            placeholder={file?.name || "Album Art"}
            accept={".jpg"}
            label={" "}
            note={"Upload your Artwork(3000px X 3000px , .jpg format)"}
          /> */}
          <Button
            containerClassName={"!rounded-none w-full !border-0 !p-0"}
            className={"!rounded-none justify-center py-[12px]"}
            onClick={() => setShowRecordLabelForm(true)}
            text={
              <div className="flex items-center gap-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.00033 2.66663C8.36851 2.66663 8.66699 2.9651 8.66699 3.33329V7.33329H12.667C13.0352 7.33329 13.3337 7.63177 13.3337 7.99996C13.3337 8.36815 13.0352 8.66663 12.667 8.66663H8.66699V12.6666C8.66699 13.0348 8.36851 13.3333 8.00033 13.3333C7.63214 13.3333 7.33366 13.0348 7.33366 12.6666V8.66663H3.33366C2.96547 8.66663 2.66699 8.36815 2.66699 7.99996C2.66699 7.63177 2.96547 7.33329 3.33366 7.33329H7.33366V3.33329C7.33366 2.9651 7.63214 2.66663 8.00033 2.66663Z"
                    fill="white"
                  />
                </svg>
                Create Record Label
              </div>
            }
          ></Button>
        </aside>
      </div>
      <div className="lg:w-1/2 mt-3">
        <SelectOptions
          placeholder={"Select..."}
          labelClassName={"font-medium text-subtitle-2 !text-black"}
          required={true}
          label={"Publisher"}
          note={
            "If you don't have any you can use our name or you can create your own"
          }
          value={formData.publisher}
          onChange={(e) =>
            setFormData({ ...formData, publisher: e.target.value })
          }
          name={"publisher"}
          options={recordLabels}
        />
      </div>

      <Button
        containerClassName={"w-fit mx-auto lg:mt-6"}
        onClick={handleDetailSubmit}
        // disabled={Object.values(formData).length < 7}
        // type={"submit"}
      >
        Save and Next
      </Button>

      {showRecordLabelForm && (
        <Modal>
          <CreateRecordLabel setShowRecordLabelForm={setShowRecordLabelForm} />
        </Modal>
      )}
    </div>
  );
};

export default AlbumDetails;
