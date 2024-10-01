import React, { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UploadRecordLabel = () => {
  const [file, setFile] = useState({});
  const { userData } = useContext(ProfileContext);
  const [initiated, setInitiated] = useState(false);

  console.log(userData);

  const handleRecordLabelUpload = async (e) => {
    e.preventDefault();
    setInitiated(true);

    const formData = new FormData();

    formData.append("file", file);

    const config = {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    };

    const recordLabelFile = await axios.post(
      backendUrl + "upload-record-labels",
      formData,
      config
    );

    const body = {
      recordLabelPdf: recordLabelFile.data.url,
      emailId: userData.user_email,
    };

    axios
      .post(backendUrl + "upload-record-labels/details", body)
      .then(({ data }) => {
        if (data.insertedId) {
          setInitiated(false);

          e.target.reset();
          setFile({});
          Swal.fire({
            icon: "success",
            text: "Record Label Uploaded Successfully",
          });
        }
      });

    // console.log(recordLabelFile);
  };

  return (
    <div
      className={`w-full bg-grey-light rounded-2xl p-4 text-grey-dark relative overflow-y-auto`}
    >
      <h4 className="text-heading-4-bold">Upload Record Labels</h4>

      <form
        action=""
        className="flex justify-between items-center"
        onSubmit={handleRecordLabelUpload}
      >
        <InputField
          type="file"
          containerClassName={"w-9/12"}
          accept="application/pdf"
          id="record-label"
          placeholder={file.name || "Upload Your PDF"}
          onChange={(e) => setFile(e.target.files[0])}
          required={true}
        />

        <div className="flex justify-center w-3/12">
          <Button
            containerClassName={"w-full"}
            className={"inline-block !w-full justify-center"}
            type={"submit"}
            disabled={initiated || !file.name}
          />
        </div>
      </form>
    </div>
  );
};

export default UploadRecordLabel;
