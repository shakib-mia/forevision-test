import React from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";

const LinkFacebookAndInstagramProfile = () => {
  const fields = [
    {
      label: "Song Name",
      placeholder: "Song Name",
      name: "link_facebook_insta_song_name",
      type: "text",
      required: true,
    },
    {
      label: "ISRC Code",
      placeholder: "ISRC Code",
      name: "link_facebook_insta_song_isrc",
      type: "text",
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email Address",
      name: "link_facebook_insta_song_email",
      type: "email",
      required: true,
    },
    {
      label: "FB Artist Page URL",
      placeholder: "FB Artist Page URL",
      name: "link_facebook_insta_song_url",
      type: "text",
      required: true,
    },
    {
      label: "Instagram Handle",
      placeholder: "Enter Your Instagram Handle Here",
      name: "link_facebook_insta_song_insta",
      type: "text",
      required: true,
    },
  ];
  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header={
          <>
            Link Facebook and Instagram <br /> Profile with Songs
          </>
        }
        subheader={
          <>
            We offer this feature to everyone <br /> who distributes music from
            us.
          </>
        }
      />

      <Form
        fields={fields}
        uIdKey="link_user_id"
        id="fb-insta-profile"
        // backendUrl="http://adztronaut.com/music/admin/api/addFacebookInstaSong"
      />
    </div>
  );
};

export default LinkFacebookAndInstagramProfile;
