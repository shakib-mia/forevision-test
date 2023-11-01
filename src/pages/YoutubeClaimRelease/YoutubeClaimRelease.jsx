import React from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";

const YoutubeClaimRelease = () => {
  const fields = [
    {
      label: "User Name",
      placeholder: "Name",
      type: "text",
      name: "name",
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email",
      type: "email",
      required: true,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      type: "tel",
      required: false,
    },
    {
      label: "Song Name",
      placeholder: "Song Name",
      type: "text",
      required: true,
    },
    {
      label: "YT Video URl",
      placeholder: "E.g. https://www.youtube.com/Zs8LFaaLa/",
      type: "text",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
  };

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="YouTube Claim Release"
        subheader={
          <>Received a claim on your own video? here we are for you!</>
        }
      />

      <Form fields={fields} handleSubmit={handleSubmit} />
    </div>
  );
};

export default YoutubeClaimRelease;
