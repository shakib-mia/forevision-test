import React, { useContext } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";

const YearlyPlanForm = () => {
  const { userData, token } = useContext(ProfileContext);
  //   console.log(userData);
  const fields = [
    {
      placeholder: "Enter Yor Email ID",
      required: true,
      hideRequired: true,
      name: "emailId",
      id: "emailId",
      label: "Email ID",
      containerClassName: "mt-0",
      value: userData.emailId,
      disabled: true,
    },
    {
      placeholder: "Phone Number",
      required: true,
      hideRequired: true,
      name: "phoneNo.",
      name: "phoneNo",
      label: "Phone No.",
      value: userData.phone_no,
      disabled: true,
    },
    {
      placeholder: "Total Released Song",
      required: true,
      hideRequired: true,
      name: "totalReleasedSong",
      id: "totalReleasedSong",
      label: "Total Released Song",
      type: "text",
    },
    {
      placeholder: "Total Revenue Earned",
      required: true,
      hideRequired: true,
      name: "totalRevenueEarned",
      id: "totalRevenueEarned",
      label: "Total Revenue Earned",
    },
    {
      placeholder: "Spotify Profile Link",
      required: true,
      hideRequired: true,
      label: "Spotify Profile Link",
      name: "spotifyProfileLink",
      id: "spotifyProfileLink",
    },
    {
      placeholder: "JioSaavn Profile Link",
      required: true,
      hideRequired: true,
      label: "JioSaavn Profile Link",
      name: "jioSaavnProfileLink",
      id: "jioSaavnProfileLink",
    },
    {
      placeholder: "YouTube Profile Link",
      required: true,
      hideRequired: true,
      label: "YouTube Profile Link",
      name: "youtubeProfileLink",
      id: "youtubeProfileLink",
    },
    {
      placeholder: "Instagram account link",
      required: true,
      hideRequired: true,
      label: "Instagram account link",
      name: "instagramAccountLink",
      id: "instagramAccountLink",
      type: "text",
    },
    {
      placeholder: "Facebook account link",
      required: true,
      hideRequired: true,
      label: "Facebook account link",
      name: "facebookAccountLink",
      id: "facebookAccountLink",
      type: "text",
    },
    {
      placeholder: "Monthly Content",
      required: true,
      hideRequired: true,
      label: "Monthly Content",
      name: "monthlyContent",
      id: "monthlyContent",
      type: "number",
    },
    {
      placeholder: "Monthly Listeners",
      required: true,
      hideRequired: true,
      label: "Monthly Listeners",
      name: "monthlyListeners",
      id: "monthlyListeners",
      type: "number",
    },
    {
      placeholder: "Number of songs uploaded till date through Forevision",
      required: true,
      hideRequired: true,
      name: "songsTillDateThroughForevision",
      id: "songsTillDateThroughForevision",
      label: "Number of songs uploaded till date through Forevision",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const planData = {};

    fields.map((item) => (planData[item.name] = e.target[item.name].value));

    // console.log(planData);
    axios
      .post(backendUrl + "yearly-plans", planData, {
        headers: { token },
      })
      .then(({ data }) => {
        if (data.acknowledged) {
          e.target.reset();
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full overflow-y-auto bg-white h-full"
    >
      {fields.map((field, key) => (
        <InputField
          // labelClassName={"!text-white"}
          containerClassName={"mt-1 lg:mt-4"}
          key={key}
          // type={"text"}
          // className="text-black"
          {...field}
        />
      ))}

      <div className="flex justify-center mt-2">
        <Button type={"submit"}>Submit</Button>
      </div>
    </form>
  );
};

export default YearlyPlanForm;
