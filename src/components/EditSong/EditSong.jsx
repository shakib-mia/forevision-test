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

  const newFormData = { ...updatedData };

  delete newFormData.uniqueKey;
  delete newFormData.availablePlatforms;
  delete newFormData.jioTunes;
  delete newFormData.bsnl;
  delete newFormData.airtel;
  delete newFormData.vi;
  newFormData["youtube-topic-video"] = newFormData["youtube-content-id"];
  delete newFormData["youtube-content-id"];
  delete newFormData.musixmatch;
  // delete newFormData.musixmatch;
  delete newFormData.LyricFind;
  delete newFormData.rejected;
  delete newFormData.updated;
  delete newFormData.status;
  delete newFormData.reason;
  delete newFormData.payment_id;
  delete newFormData.requested;
  delete newFormData.hold;
  delete newFormData["transaction-id"];
  delete newFormData.orderId;
  delete newFormData.order_id;
  delete newFormData.artists;
  delete newFormData.ISRC;
  delete newFormData.paid;
  delete newFormData.transactionId;
  // delete newFormData.ISRC;
  delete newFormData.selectedPlatforms;
  delete newFormData._id;
  delete newFormData.publisher;
  delete newFormData.recordLabel;
  delete newFormData.artWork;
  delete newFormData.albumType;
  delete newFormData.songUrl;
  // delete newFormData.ISRC;
  delete newFormData.contentType;
  delete newFormData.startMinutes;
  delete newFormData.startMinutes2;
  delete newFormData.startSeconds;
  delete newFormData.startSeconds2;
  delete newFormData.albumTitle;
  delete newFormData.description;
  delete newFormData.genre;
  delete newFormData.subGenre;
  delete newFormData.mood;
  delete newFormData.releaseDate;
  delete newFormData.liveDate;
  delete newFormData.time;
  delete newFormData.userEmail;
  delete newFormData.price;
  delete newFormData.planName;
  delete newFormData.signature;
  delete newFormData.accepted;

  // console.log(updatedData);

  return (
    <AuthBody
      heading="Edit Song"
      // altDescription="Already Have an Account?"
      // altText="Log in"
      // altLink="/login"
      onSubmit={edit}
      className="backdrop-blur fixed top-0 left-0 z-[99999999999]"
      id="edit-song"
      closeIcon={true}
      handleClose={() => setEditId("")}
      whiteContainerClass="h-3/4 relative lg:!w-1/2 !mx-auto overflow-y-auto overflow-x-hidden"
    >
      <EditSongForm updatedData={newFormData} setUpdatedData={setUpdatedData} />
    </AuthBody>
  );
};

export default EditSong;
