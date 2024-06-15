import React, { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { FaTimes } from "react-icons/fa";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";
// import axios from "axios";
// import { ProfileContext } from "../../contexts/ProfileContext";
// import { backendUrl } from "../../constants";

const CreateRecordLabel = ({ setShowRecordLabelForm }) => {
  const [selectedCode, setSelectedCode] = useState("91");
  const [isPerpetual, setIsPerpetual] = useState(false);
  const { token } = useContext(ProfileContext);
  // const { recordLabels } = useContext(ProfileContext);

  // console.log(recordLabels);

  const handleRecordLabelSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token,
      },
    };

    // setShowRecordLabelForm(false);
    const data = {
      "Sub-Label Name": e.target.recordLabelName.value,
      phoneNo: e.target.phoneNo.value,
      status: "Active",
      "Email ID": e.target.email.value,
      address: e.target.address.value,
      "Start Date": e.target.startDate.value,
      "End Date": e.target.endDate?.value || "",
      signatoryName: e.target.signatoryName.value,
    };

    axios
      .post(backendUrl + "record-labels", data, config)
      .then(({ data }) => console.log(data))
      .catch((error) =>
        toast.error(error.response.data, {
          position: "bottom-center",
        })
      );

    // console.log(data);
  };

  return (
    <form
      className="bg-white p-4 rounded w-1/2 h-5/6 overflow-auto relative"
      onSubmit={handleRecordLabelSubmit}
    >
      <button
        className="text-interactive-light-destructive absolute top-2 right-2"
        type="button"
        onClick={() => setShowRecordLabelForm(false)}
      >
        <FaTimes />
      </button>
      <h5 className="text-heading-5-bold text-center mt-4">
        Create A New Record Label
      </h5>

      <InputField
        type={"text"}
        placeholder={"Record Label Name"}
        label={"Name"}
        name={"recordLabelName"}
        // hideRequired={true}
        id={"record-label-name"}
        required={true}
      />

      <div className="flex gap-3 mt-3">
        <InputField
          type={"tel"}
          placeholder={"Enter your phone no. here"}
          label={"Phone No."}
          setSelectedCode={setSelectedCode}
          name={"phoneNo"}
          selectedCode={selectedCode}
          containerClassName={"w-1/2"}
          id={"phone-no"}
          required={true}
        />

        <InputField
          type={"email"}
          placeholder={"Enter your email address here"}
          name={"email"}
          id={"email"}
          label={"Email id"}
          containerClassName={"w-1/2"}
          required={true}
        />
      </div>

      <InputField
        type={"text"}
        placeholder={"Enter your address here"}
        id={"address"}
        label={"Address"}
        name={"address"}
        containerClassName={"mt-3"}
        hideRequired={true}
      />

      <div className="flex gap-3 mt-3">
        <InputField
          type={"date"}
          containerClassName={"w-1/2"}
          hideRequired={true}
          name={"startDate"}
          label={"Start Date"}
        />

        {!isPerpetual && (
          <InputField
            type={"date"}
            containerClassName={"w-1/2"}
            name={"endDate"}
            hideRequired={true}
            label={"End Date"}
          />
        )}
      </div>

      <InputField
        type={"checkbox"}
        containerClassName={"mt-1"}
        label={"Perpetual"}
        id={"perpetual"}
        onChange={(e) => setIsPerpetual(e.target.checked)}
        hideRequired={true}
      />

      <InputField
        type={"text"}
        placeholder={"Enter your signature here"}
        label={"Signatory Person Name"}
        name={"signatoryName"}
        id={"signature"}
        containerClassName={"mt-3"}
        hideRequired={true}
      />

      <div className="flex justify-center">
        <Button
          type={"submit"}
          text={"Save and Next"}
          containerClassName={"mt-6 mx-auto"}
          // onClick={() => }
        />
      </div>
    </form>
  );
};

export default CreateRecordLabel;
