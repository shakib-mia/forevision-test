import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import axios from "axios";

const YoutubeVideoTakedown = () => {
  const [countries, setCountries] = useState([]);
  const fields = [
    {
      label: "User Name",
      name: "User Name",
      placeholder: "Name",
      type: "text",
      required: true,
    },
    {
      label: "Email Address",
      name: "Email Address",
      placeholder: "Email",
      type: "email",
      required: true,
    },
    {
      label: "Phone",
      name: "Phone",
      placeholder: "Phone",
      type: "tel",
      required: false,
    },
    {
      label: "Content Name",
      name: "Content Name",
      placeholder: "Content Name",
      type: "text",
      required: true,
    },
    {
      label: "Name of the Copyright Owner",
      name: "Name of the Copyright Owner",
      placeholder: "Name of the Copyright Owner",
      type: "text",
      required: true,
    },

    {
      label: "Video URL for takedown",
      name: "Video URL for takedown",
      placeholder: "Video URL for takedown",
      type: "text",
      required: true,
    },

    {
      label: "Street Address",
      name: "Street Address",
      placeholder: "Street Address",
      type: "text",
      required: true,
    },
    {
      label: "City",
      name: "City",
      placeholder: "City",
      type: "text",
      required: true,
    },
    {
      label: "State/Province",
      name: "State/Province",
      placeholder: "State/Province",
      type: "text",
      required: true,
    },
    {
      label: "Zip/Postal Code",
      name: "Zip/Postal Code",
      placeholder: "Zip/Postal Code",
      type: "text",
      required: true,
    },
    {
      label: "Country",
      name: "Country",
      placeholder: "Country",
      type: "dropdown",
      id: "country",
      options: countries,
      required: true,
    },
    {
      label: "Removal options",
      placeholder: "Removal options",
      name: "promotional_tool_artist_type",
      id: "removal",
      type: "multi-select",
      selectItems: [
        {
          text: "Scheduled: Send a 7-day notice",
          name: "promotional_tool_artist_type",
          selected: false,
        },
        {
          text: "Standard: Request Removal Now",
          name: "promotional_tool_artist_type",
          selected: false,
        },
      ],
      required: true,
    },

    // {
    //   label:
    //     "The information in this form is accurate, and under penalty of perjury. I am the owner, or an agent authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed.",
    //   name: "The information in this form is accurate, and under penalty of perjury. I am the owner, or an agent authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed.",
    //   placeholder: "Country",
    //   type: "multi-select",
    //   id: "country",
    //   options: countries,
    //   required: true,
    // },

    {
      label: "Legal agreements",
      placeholder: "Legal Agreements",
      name: "agreement",
      type: "multi-select",
      id: "legal-agreement",
      selectItems: [
        {
          text: "The information in this form is accurate, and under penalty of perjury. I am the owner, or an agent authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed",
          // name: "promotional_tool_artist_type",
          selected: false,
        },
      ],
      required: true,
    },
  ];

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(({ data }) => {
      setCountries(data.map((item) => item.name.common));
    });
  }, []);

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="YouTube Video Takedown"
        subheader={
          <>Received a claim on your own video? here we are for you!</>
        }
      />

      <Form fields={fields} uIdKey={"takedown"} />
    </div>
  );
};

export default YoutubeVideoTakedown;
