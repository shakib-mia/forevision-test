import React from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
// import axios from "axios";

const Pitch = () => {
  const fields = [
    {
      label: "Name",
      placeholder: "Name",
      name: "pitch_name",
      type: "text",
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email Address",
      name: "pitch_email",
      type: "email",
      required: true,
    },
    {
      label: "Phone",
      placeholder: "Enter Your Phone Number Here",
      name: "pitch_phone",
      type: "tel",
      required: true,
      // pattern: /^((\+91)?|91|91\s|\+91\s)?[789][0-9]{9}/g,
    },
    {
      label: "Release Date",
      placeholder: "Release Date",
      name: "pitch_release_date",
      type: "date",
      required: true,
    },
    {
      label: "Artist YT Channel",
      placeholder: "E.g. https://www.youtube.com/Zs8LFaaLa/",
      name: "pitch_yt_channel",
      type: "text",
      required: true,
    },
    {
      label: "Artist Topic Channel",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "pitch_topic_channel",
      type: "text",
      required: true,
    },
  ];

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="Pitch For Editorial Playlist"
        // subheader={
        //   <>UPGRADE YOUR CREATOR CHANNEL TO YOUTUBE OFFICIAL ARTIST CHANNEL</>
        // }
      />

      <Form
        fields={fields}
        uIdKey={"youtube_user_id"}
        id="pitch-for-editorial-playlist"
        // backendUrl="http://adztronaut.com/music/admin/api/addYouTubeOac"
      />
    </div>
  );
};

export default Pitch;
