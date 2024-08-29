import React, { useContext, useState } from "react";
import AuthBody from "../AuthBody/AuthBody";
import SelectOptions from "../SelectOptions/SelectOptions";
import Button from "../Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import InputField from "../InputField/InputField";

const Takedown = ({ setEditId, songData }) => {
  const [reason, setReason] = useState("");
  const { userData } = useContext(ProfileContext);

  const handleTakedown = (e) => {
    e.preventDefault();

    const formData = {};

    formData.isrc = songData.ISRC;
    formData.reason = reason;
    formData.emailId = userData.emailId;

    // console.log(formData);
    axios
      .post(backendUrl + "takedown-requests", formData, config)
      .then(({ data }) => console.log(data));
  };

  return (
    <AuthBody
      heading="Takedown"
      // altDescription="Already Have an Account?"
      // altText="Log in"
      // altLink="/login"
      // onSubmit={edit}

      className="backdrop-blur fixed top-0 left-0 z-[9999]"
      id="edit-song"
      closeIcon={true}
      onSubmit={handleTakedown}
      handleClose={() => setEditId("")}
      whiteContainerClass="h-2/3 relative lg:!w-1/3 !mx-auto overflow-y-auto overflow-x-hidden"
    >
      {/* <EditSongForm updatedData={updatedData} setUpdatedData={setUpdatedData} /> */}
      {/* <SelectOptions
        options={[1, 2, 3, 4, 5, 6]}
        onChange={(e) => setReason(e.target.value)}
        label={"Reason"}
        hideRequired={true}
        note={"Enter a Reason for Taking Down your song"}
      /> */}
      <InputField
        onChange={(e) => setReason(e.target.value)}
        label={"Reason"}
        required={true}
        hideRequired={true}
        placeholder={"Enter a Reason for Taking Down your song"}
      />

      <div className="flex justify-center mt-4">
        <Button type={"submit"}>Submit</Button>
      </div>
    </AuthBody>
  );
};

export default Takedown;
