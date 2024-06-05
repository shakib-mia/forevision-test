import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { FaTimes } from "react-icons/fa";
// import axios from "axios";
// import { ProfileContext } from "../../contexts/ProfileContext";
// import { backendUrl } from "../../constants";

const CreateRecordLabel = ({ setShowRecordLabelForm }) => {
  const [selectedCode, setSelectedCode] = useState("91");
  const [isPerpetual, setIsPerpetual] = useState(false);
  // const { recordLabels } = useContext(ProfileContext);

  // console.log(recordLabels);

  const handleRecordLabelSubmit = (e) => {
    e.preventDefault();

    setShowRecordLabelForm(false);
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
          selectedCode={selectedCode}
          containerClassName={"w-1/2"}
          id={"phone-no"}
          required={true}
        />

        <InputField
          type={"email"}
          placeholder={"Enter your email address here"}
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
        containerClassName={"mt-3"}
        hideRequired={true}
      />

      <div className="flex gap-3 mt-3">
        <InputField
          type={"date"}
          containerClassName={"w-1/2"}
          hideRequired={true}
          label={"Start Date"}
        />

        {!isPerpetual && (
          <InputField
            type={"date"}
            containerClassName={"w-1/2"}
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
