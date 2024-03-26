import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import SongUploadForm from "../../components/SongUploadForm/SongUploadForm";

const SongUpload = () => {
  const [count, setCount] = useState(1);
  const [singleUpload, setSingleUpload] = useState(true);

  useEffect(() => {
    if (singleUpload) {
      setCount(1);
    } else {
      setCount(2);
    }
  }, [singleUpload]);

  return (
    <div className="2xl:p-4 2xl:pl-7 mb-6 2xl:mb-0">
      <p>What Do You Want to Release?</p>

      <label>
        <input
          type="radio"
          name="upload-type"
          checked={singleUpload}
          className="mr-1"
          onChange={(e) => {
            e.target.checked && setSingleUpload(true);
          }}
        />
        Single Song
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="upload-type"
          checked={!singleUpload}
          className="mr-1"
          onChange={(e) => {
            e.target.checked && setSingleUpload(false);
          }}
        />
        Album
      </label>

      {[...Array(count).fill()].map((_, index) => (
        <SongUploadForm index={index} key={index} />
      ))}
      {count === 1 || (
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
