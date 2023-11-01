import React from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";

const FbInstaWhitelisting = () => {
  const fields = [
    {
      label: "User Name",
      placeholder: "Name",
      type: "text",
      name: "userName",
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email",
      type: "email",
      name: "email",
      required: true,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      type: "tel",
      name: "phone",
      required: true,
    },
    {
      label: "Record Label",
      placeholder: "Record Label",
      type: "text",
      name: "recordLabel",
      required: true,
    },
    {
      label: "URL of the Facebook Page to be linked",
      placeholder: "E.g. https://www.facebook.com/Zs8LFaaLa/",
      type: "text",
      name: "urlOfFbPage",
      required: false,
    },
    {
      label: "Please provide URL of Instagram handle to be whitelisted",
      placeholder: "E.g. https://www.instagram.com/Zs8LFaaLa/",
      type: "text",
      name: "instaProfileUrl",
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

      <Form fields={fields} />
    </div>
  );
};

export default FbInstaWhitelisting;
