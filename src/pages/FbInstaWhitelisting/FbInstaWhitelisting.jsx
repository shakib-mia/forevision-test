import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import { ProfileContext } from "../../contexts/ProfileContext";

const FbInstaWhitelisting = () => {
  const { userData } = useContext(ProfileContext);

  const fields = [
    {
      label: "User Name",
      placeholder: "Name",
      type: "text",
      name: "rfacebook_insta_whitelisting_uname",
      value: userData["user-id"],
      disabled: userData["user-id"]?.length,
    },
    {
      label: "Email Address",
      placeholder: "Email",
      type: "email",
      name: "rfacebook_insta_whitelisting_uemail",
      value: userData.emailId,
      disabled: userData.emailId?.length,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      type: "text",
      name: "rfacebook_insta_whitelisting_phone",

      value: userData?.phone_no,
      disabled: userData?.phone_no?.length,
    },
    {
      label: "Record Label",
      placeholder: "Record Label",
      type: "text",
      name: "rfacebook_insta_whitelisting_record_label",
      required: true,
    },
    {
      label: "URL of the Facebook Page to be linked",
      placeholder: "E.g. https://www.facebook.com/Zs8LFaaLa/",
      type: "text",
      name: "rfacebook_insta_whitelisting_furl",
      required: true,
    },
    {
      label: "Please provide URL of Instagram handle to be whitelisted",
      placeholder: "E.g. https://www.instagram.com/Zs8LFaaLa/",
      type: "text",
      name: "rfacebook_insta_whitelisting_iurl",
      required: true,
    },
  ];

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="Request for Facebook Instagram Whitelisting"
        subheader={
          <>We offer this feature to everyone who distributes music from us.</>
        }
      />

      <Form
        id="fb-insta-whitelisting"
        fields={fields}
        uIdKey="rfacebook_insta_whitelisting_uid"
        backendUrl="https://beta.forevisiondigital.com/admin/api/addFacebookInstaWhitelisting"
      />
    </div>
  );
};

export default FbInstaWhitelisting;
