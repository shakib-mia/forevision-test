import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import SelectOptions from "../SelectOptions/SelectOptions";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import { camelCaseToNormalText } from "../../utils/camelCaseToNormalText";

const EditSongForm = ({ updatedData, setUpdatedData }) => {
  const [recordLabels, setRecordLabels] = useState([]);
  // console.log(updatedData);
  useEffect(() => {
    axios
      .get(backendUrl + "record-labels", config)
      .then(({ data }) => setRecordLabels(data));
  }, []);

  const languagesInIndia = [
    "Ahirani",
    "Arabic",
    "Assamese",
    "Awadhi",
    "Bengali",
    "Bhojpuri",
    "Chattisgarhi",
    "Dogri",
    "English",
    "Garhwali",
    "Garo",
    "Gujarati",
    "Haryanvi",
    "Himachali",
    "Hindi",
    "Instrumental",
    "Kannada",
    "Kashmiri",
    "Khasi",
    "kokborok",
    "Konkani",
    "kumauni",
    "Maithili",
    "Malayalam",
    "Mandarin",
    "Manipuri",
    "Marathi",
    "Marwari",
    "Naga",
    "Nagpuri",
    "Nepali",
    "Odia",
    "Punjabi",
    "Rajasthani",
    "Rajbongshi",
    "Sanskrit",
    "Tamil",
    "Telugu",
    "Urdu",
    "Tulu",
  ];

  return (
    <>
      {Object.entries(updatedData).map(([label, value], key) => {
        if (label === "Language") {
          return (
            <div className="grid grid-cols-2 mb-2 items-center" key={key}>
              <label>{camelCaseToNormalText(label)}</label>
              <SelectOptions
                value={value}
                options={languagesInIndia}
                // label={"Language"}
                hideRequired={true}
                placeholder={"Select..."}
                // required={true}
                onChange={(e) => {
                  // // setFormData({ ...formData, language: e.target.value });
                  // if (location.pathname === "/album-upload") {
                  //   formData.songs[id].language = e.target.value;
                  //   setFormData({ ...formData });
                  // } else {
                  //   setFormData({ ...formData, language: e.target.value });
                  // }
                  setUpdatedData({ ...updatedData, [label]: e.target.value });
                }}
              />
            </div>
          );
        } else if (label === "Sub Label") {
          return (
            <div className="grid grid-cols-2 mb-2 items-center" key={key}>
              <label>{camelCaseToNormalText(label)}</label>
              <SelectOptions
                value={updatedData["Sub Label"]}
                options={recordLabels}
                // label={"Language"}
                hideRequired={true}
                placeholder={updatedData[label] || "Select..."}
                // required={true}
                onChange={(e) => {
                  // // setFormData({ ...formData, language: e.target.value });
                  // if (location.pathname === "/album-upload") {
                  //   formData.songs[id].language = e.target.value;
                  //   setFormData({ ...formData });
                  // } else {
                  //   setFormData({ ...formData, language: e.target.value });
                  // }
                  setUpdatedData({ ...updatedData, [label]: e.target.value });
                }}
              />
            </div>
          );
        } else {
          return (
            label === "_id" ||
            label === "S.no" || (
              <div className="grid grid-cols-2 mb-2 items-center" key={key}>
                <label>{camelCaseToNormalText(label)}</label>
                <InputField
                  disabled={
                    label === "UPC" || label === "ISRC" || label === "Label"
                  }
                  value={value}
                  onChange={(e) => {
                    setUpdatedData({ ...updatedData, [label]: e.target.value });
                    //   console.log(updatedData);
                  }}
                />
              </div>
            )
          );
        }
      })}

      <div className="flex justify-center mt-5">
        <Button type={"submit"}>Request Edit</Button>
      </div>
    </>
  );
};

export default EditSongForm;
