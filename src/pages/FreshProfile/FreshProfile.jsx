import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation } from "react-router-dom";
// import axios from "axios";

const FreshProfile = () => {
  const { userData } = useContext(ProfileContext);
  //   console.log(userData);
  const isrcArray = userData.isrc?.split(",") || [];
  const result = isrcArray.map((item) => ({
    text: item.trim(),
    selected: false,
  }));
  const location = useLocation();
  // console.log();

  const fields = [
    {
      label: "Name",
      placeholder: "Name",
      name:
        location.pathname
          .split("-fresh-profile")[0]
          .split("/")[1]
          .split("-")
          .join("_") + "_fresh_profile_name",
      type: "text",
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email Address",
      name:
        location.pathname
          .split("-fresh-profile")[0]
          .split("/")[1]
          .split("-")
          .join("_") + "_fresh_profile_email",
      type: "email",
      required: true,
    },
    {
      label: "UPC",
      placeholder: "Enter Your UPC Here. Use Comma (,) to Separate UPCs",
      name:
        location.pathname
          .split("-fresh-profile")[0]
          .split("/")[1]
          .split("-")
          .join("_") + "_fresh_profile_upc",
      type: "text",
      required: true,
      // pattern: /^((\+91)?|91|91\s|\+91\s)?[789][0-9]{9}/g,
    },
    {
      label: "ISRC",
      placeholder: "ISRC",
      name:
        location.pathname
          .split("-fresh-profile")[0]
          .split("/")[1]
          .split("-")
          .join("_") + "_fresh_profile_isrc",
      type: "multi-select",
      selectItems: isrcArray.map((item) => ({
        text: item.trim(),
        selected: false,
      })),
      required: true,
    },
    {
      label: "Content Name",
      placeholder:
        "Enter Content Names Here. Use Comma (,) to Separate Contents",
      name:
        location.pathname
          .split("-fresh-profile")[0]
          .split("/")[1]
          .split("-")
          .join("_") + "_fresh_profile_content_name",
      type: "text",
      required: true,
    },
    {
      label: "Fresh Profile",
      placeholder: "or Profile Relocate",
      name:
        location.pathname
          .split("-fresh-profile")[0]
          .split("/")[1]
          .split("-")
          .join("_") + "_fresh_profile_fresh_profile",
      type: "text",
      required: true,
    },
    {
      label: "For Fresh Profile",
      placeholder:
        "Album Url's(Can be multiple) & Artist Name, Use Comma (,) to Separate Profiles",
      name:
        location.pathname
          .split("-fresh-profile")[0]
          .split("/")[1]
          .split("-")
          .join("_") + "_fresh_profile_urls",
      type: "text",
      required: true,
    },
    {
      label: "For Profile Relocate",
      placeholder:
        "Artist Profile Link and the content url thats needs to be tagged. Use Comma (,) to Separate Links",
      name:
        location.pathname
          .split("-fresh-profile")[0]
          .split("/")[1]
          .split("-")
          .join("_") + "_fresh_profile_profile_relocate",
      type: "text",
      required: true,
    },
  ];

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header={`${
          location.pathname
            .split("-fresh-profile")[0]
            .split("/")[1]
            .split("-")
            .join(" ") !== "jiosaavn"
            ? location.pathname
                .split("-fresh-profile")[0]
                .split("/")[1]
                .split("-")
                .join(" ")
            : "JioSaavn"
        } Profile Relocate/Fresh Profile`}
        // subheader={
        //   <>UPGRADE YOUR CREATOR CHANNEL TO YOUTUBE OFFICIAL ARTIST CHANNEL</>
        // }
      />

      <Form
        fields={fields}
        uIdKey={"youtube_user_id"}
        id={location.pathname.split("/")[1]}
        // backendUrl="http://adztronaut.com/music/admin/api/addYouTubeOac"
      />
    </div>
  );
};

export default FreshProfile;
