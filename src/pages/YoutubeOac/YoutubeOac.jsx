import React from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
// import axios from "axios";

const YoutubeOac = () => {
  const fields = [
    {
      label: "Name",
      placeholder: "Name",
      name: "youtube_oac_name",
      type: "text",
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email Address",
      name: "youtube_oac_email",
      type: "email",
      required: true,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      name: "youtube_oac_phone",
      type: "tel",
      required: true,
      // pattern: /^((\+91)?|91|91\s|\+91\s)?[789][0-9]{9}/g,
    },
    {
      label: "Artist/Channel Name",
      placeholder: "Artist/Channel Name",
      name: "youtube_oac_channnel_name",
      type: "text",
      required: true,
    },
    {
      label: "Artist YT Channel",
      placeholder: "E.g. https://www.youtube.com/Zs8LFaaLa/",
      name: "youtube_oac_yt_channel",
      type: "text",
      required: true,
    },
    {
      label: "Artist Topic Channel",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "youtube_oac_topic_channel",
      type: "text",
      required: true,
    },
  ];

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="Youtube OAC"
        subheader={
          <>UPGRADE YOUR CREATOR CHANNEL TO YOUTUBE OFFICIAL ARTIST CHANNEL</>
        }
      />

      <Form
        fields={fields}
        uIdKey={"youtube_user_id"}
        id="youtube-oac"
        // backendUrl="http://adztronaut.com/music/admin/api/addYouTubeOac"
      />
    </div>
  );
};

export default YoutubeOac;
