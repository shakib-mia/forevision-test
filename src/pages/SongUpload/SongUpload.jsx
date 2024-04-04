import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import SongUploadForm from "../../components/SongUploadForm/SongUploadForm";

const SongUpload = () => {
  const [count, setCount] = useState(1);
  // const [singleUpload, setSingleUpload] = useState(true);
  const [uploadType, setUploadType] = useState("Single");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // console.log(uploadType);
    if (uploadType === "Single") {
      setCount(1);
    } else if (uploadType === "Album") {
      setCount(1);
    }
  }, [uploadType]);

  return (
    <div className="p-3 2xl:p-4 2xl:pl-7 mb-6 2xl:mb-0">
      <h1 className="text-heading-1-bold text-grey pb-7">
        Let's Release a Chartbuster
      </h1>

      <h3 className="text-heading-3-bold text-grey pb-4">
        What Do You Want to Release?
      </h3>

      <label className="text-heading-5-bold text-grey-dark flex items-center gap-1">
        <input
          type="radio"
          name="upload-type"
          checked={uploadType === "Single"}
          className="mr-1"
          onChange={(e) => {
            e.target.checked && setUploadType("Single");
          }}
        />
        Single Song
      </label>
      <br />
      {/* <br /> */}
      {/* <br /> */}
      <label className="text-heading-5-bold text-grey-dark flex items-center gap-1 mb-2">
        <input
          type="radio"
          name="upload-type"
          checked={uploadType === "Album"}
          className="mr-1"
          onChange={(e) => {
            e.target.checked && setUploadType("Album");
          }}
        />
        Album
      </label>

      <label className="text-heading-5-bold text-grey-dark flex items-center gap-1 mb-2">
        <input
          type="radio"
          name="upload-type"
          checked={uploadType === "Film"}
          className="mr-1"
          onChange={(e) => {
            e.target.checked && setUploadType("Film");
          }}
        />
        Film
      </label>

      {[...Array(count).fill()].map((_, index) => (
        <SongUploadForm
          index={index}
          key={index}
          setSubmitted={setSubmitted}
          uploadType={uploadType}
        />
      ))}
      {uploadType !== "Single" && submitted && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => setCount((count) => count + 1)}
            text={"Add More"}
          ></Button>
        </div>
      )}

      {/* <form className="flex flex-col w-full items-center mt-3">
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
      </form> */}
    </div>
  );
};

export default SongUpload;
