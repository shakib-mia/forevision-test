import React from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";

const YoutubeClaimRelease = () => {
  const fields = [
    {
      label: "User Name",
      placeholder: "Name",
      type: "text",
      name: "youtube_claim_release_name",
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email",
      type: "email",
      name: "youtube_claim_release_email",

      required: true,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      type: "tel",
      name: "youtube_claim_release_phone",

      required: false,
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
