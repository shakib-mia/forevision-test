import React, { useContext, useState } from "react";
import AuthBody from "../AuthBody/AuthBody";
import EditSongForm from "../EditSongForm/EditSongForm";
import { backendUrl, config } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";

const EditSong = ({ setEditId, songData }) => {
  const [updatedData, setUpdatedData] = useState(songData);
  //   const [editId, setEditId] = useState("");
  //   console.log(updatedData);

  const { userData } = useContext(ProfileContext);

  const edit = (e) => {
    e.preventDefault();

    updatedData.emailId = userData.emailId;

    axios
      .post(backendUrl + "edit-song", updatedData, config)
      .then(({ data }) => {
        if (data.insertedId.length > 0) {
          setEditId("");
        }
      });
  };

  return (
    <AuthBody
      heading="Edit Song"
      // altDescription="Already Have an Account?"
      // altText="Log in"
      // altLink="/login"
      onSubmit={edit}
      className="backdrop-blur fixed top-0 left-0 z-[9999]"
      id="edit-song"
      closeIcon={true}
      handleClose={() => setEditId("")}
      whiteContainerClass="h-3/4 relative lg:!w-1/2 !mx-auto overflow-y-auto overflow-x-hidden"
    >
      <EditSongForm updatedData={updatedData} setUpdatedData={setUpdatedData} />
    </AuthBody>
  );
};

export default EditSong;
