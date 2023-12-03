import React from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";

const FbInstaWhitelisting = () => {
  const fields = [
    {
      label: "User Name",
      placeholder: "Name",
      type: "text",
      name: "rfacebook_insta_whitelisting_uname",
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email",
      type: "email",
      name: "rfacebook_insta_whitelisting_uemail",
      required: true,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      type: "tel",
      name: "rfacebook_insta_whitelisting_phone",
      required: true,
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
      required: false,
    },
    {
      label: "Please provide URL of Instagram handle to be whitelisted",
      placeholder: "E.g. https://www.instagram.com/Zs8LFaaLa/",
      type: "text",
      name: "rfacebook_insta_whitelisting_iurl",
      required: false,
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

      <Form fields={fields} uIdKey="rfacebook_insta_whitelisting_uid" backendUrl="https://beta.forevisiondigital.com/admin/api/addFacebookInstaWhitelisting" />
    </div>
  );
};

export default FbInstaWhitelisting;
