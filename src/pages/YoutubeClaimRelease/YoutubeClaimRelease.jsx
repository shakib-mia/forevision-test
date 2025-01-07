import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import { ProfileContext } from "../../contexts/ProfileContext";

const YoutubeClaimRelease = () => {
  const { userData } = useContext(ProfileContext);

  const fields = [
    {
      label: "User Name",
      placeholder: "Name",
      type: "text",
      name: "youtube_claim_release_name",
      value: userData["user-id"],
      disabled: userData["user-id"]?.length,
    },
    {
      label: "Email Address",
      placeholder: "Email",
      type: "email",
      name: "youtube_claim_release_email",
      value: userData.emailId,
      disabled: userData.emailId?.length,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      type: "text",
      name: "youtube_claim_release_phone",
      value: userData?.phone_no,
      disabled: userData?.phone_no?.length,
    },
    {
      label: "Song Name",
      placeholder: "Song Name",
      type: "text",
      name: "youtube_claim_release_song_name",

      required: true,
    },
    {
      label: "YT Video URl",
      placeholder: "E.g. https://www.youtube.com/Zs8LFaaLa/",
      type: "text",
      required: true,
      name: "youtube_claim_release_youTube_video_url",
    },
  ];

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="YouTube Claim Release"
        subheader={
          <>Received a claim on your own video? here we are for you!</>
        }
      />

      <Form id="youtube-claim-release" fields={fields} />
    </div>
  );
};

export default YoutubeClaimRelease;
