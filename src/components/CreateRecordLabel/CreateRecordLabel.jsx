import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

const CreateRecordLabel = ({ setShowRecordLabelForm }) => {
  const [selectedCode, setSelectedCode] = useState("91");
  const [isPerpetual, setIsPerpetual] = useState(false);
  return (
    <div className="bg-white p-4 rounded w-1/2 h-5/6 overflow-auto">
      <h5 className="text-heading-5-bold text-center">
        Create A New Record Label
      </h5>

      <InputField
        type={"text"}
        placeholder={"Record Label Name"}
        label={"Name"}
        name={"recordLabelName"}
        id={"record-label-name"}
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
        />

        <InputField
          type={"email"}
          placeholder={"Enter your email address here"}
          id={"email"}
          label={"Email id"}
          containerClassName={"w-1/2"}
        />
      </div>

      <InputField
        type={"text"}
        placeholder={"Enter your address here"}
        id={"address"}
        label={"Address"}
        containerClassName={"mt-3"}
      />

      <div className="flex gap-3 mt-3">
        <InputField
          type={"date"}
          containerClassName={"w-1/2"}
          label={"Start Date"}
        />

        {!isPerpetual && (
          <InputField
            type={"date"}
            containerClassName={"w-1/2"}
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
      />

      <InputField
        type={"text"}
        placeholder={"Enter your signature here"}
        label={"Signatory Person Name"}
        id={"signature"}
        containerClassName={"mt-3"}
      />

      <div className="flex justify-center">
        <Button
          //   type={"submit"}
          text={"Save and Next"}
          containerClassName={"mt-6 mx-auto"}
          onClick={() => setShowRecordLabelForm(false)}
        />
      </div>
    </div>
  );
};

export default CreateRecordLabel;
