import React, { useContext, useRef, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { FaTimes } from "react-icons/fa";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";
import { useLocation } from "react-router-dom";
import Letterhead from "../LetterHead/LetterHead";
import Modal from "../Modal/Modal";
import generatePDF from "react-to-pdf";
import Swal from "sweetalert2";
// import axios from "axios";
// import { ProfileContext } from "../../contexts/ProfileContext";
// import { backendUrl } from "../../constants";

const CreateRecordLabel = ({ setShowRecordLabelForm }) => {
  const [selectedCode, setSelectedCode] = useState("91");
  const [isPerpetual, setIsPerpetual] = useState(false);
  const { token, userData } = useContext(ProfileContext);
  // const { recordLabels } = useContext(ProfileContext);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const letterHeadRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  // console.log(recordLabels);

  const handleRecordLabelSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    const config = {
      headers: {
        token,
      },
    };

    // setShowRecordLabelForm(false);
    const data = {
      "Sub-Label Name": e.target.recordLabelName.value,
      phoneNo: e.target.phoneNo.value,
      status: "Requested",
      "Email ID": userData.user_email,
      address: e.target.address.value,
      "Start Date": e.target.startDate.value,
      signatoryName: e.target.signatoryName.value,
    };

    setFormData(data);
    // setShowModal(true);
    // console.log(letterHeadRef);
    const pdf = await generatePDF(letterHeadRef, {
      filename: `LetterHead of ${e.target.recordLabelName.value}.pdf`,
      page: {
        format: "letter",
      },
    });

    console.log(pdf);
    const formData = new FormData();
    formData.append("file", pdf);
    axios
      .post(backendUrl + "upload-letterhead", formData)
      .then(({ data }) => console.log(data));

    axios
      .post(backendUrl + "record-labels", data, config)
      .then(({ data }) => {
        if (data.acknowledged) {
          // window.location.reload();
          e.target.reset();
          setSubmitted(false);

          Swal.fire({
            title: "Record Label Submitted Successfully",
            // confirmButtonColor: "#2B52DD",
            customClass: {
              confirmButton:
                "px-[44px] !py-[12px] !text-white !outline-[2px] !outline-interactive-light !bg-interactive-light !text-button hover:!bg-interactive-light-hover active:!bg-interactive-light-active focus:!bg-interactive-light-focus !font-bold !rounded-full !cursor-pointer !uppercase disabled:!bg-interactive-light-disabled disabled:!cursor-not-allowed",
            },
          });
        }
      })
      .catch((error) =>
        toast.error(error.response.data, {
          position: "bottom-center",
        })
      );

    // console.log(data);
  };

  const location = useLocation();

  return (
    <form
      className={`${
        location.pathname === "/"
          ? "bg-grey-light p-4 rounded-2xl"
          : "bg-white p-4 rounded w-11/12 lg:w-1/2 h-5/6 overflow-auto relative"
      }`}
      onSubmit={handleRecordLabelSubmit}
    >
      {location.pathname === "/" || (
        <button
          className="text-interactive-light-destructive absolute top-2 right-2"
          type="button"
          onClick={() => setShowRecordLabelForm(false)}
        >
          <FaTimes />
        </button>
      )}
      <h5
        className={
          location.pathname === "/"
            ? "text-heading-4-bold text-grey-dark mb-2"
            : "text-heading-5-bold text-center mt-4"
        }
      >
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

      <div className="flex flex-col xl:flex-row gap-3 mt-3">
        <InputField
          type={"tel"}
          placeholder={"Enter your phone no. here"}
          label={"Phone No."}
          setSelectedCode={setSelectedCode}
          name={"phoneNo"}
          selectedCode={selectedCode}
          containerClassName={"xl:w-1/2"}
          id={"phone-no"}
          required={true}
        />

        <InputField
          type={"email"}
          disabled={true}
          placeholder={"Enter your email address here"}
          name={"email"}
          id={"email"}
          label={"Email id"}
          value={userData.user_email}
          containerClassName={"xl:w-1/2"}
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

      <div className="flex flex-col xl:flex-row gap-3 mt-3">
        <InputField
          type={"date"}
          containerClassName={"xl:w-1/2"}
          hideRequired={true}
          name={"startDate"}
          label={"Start Date"}
        />

        {/* {!isPerpetual && ( */}
        {/* <InputField
          type={"date"}
          containerClassName={"w-1/2"}
          name={"endDate"}
          hideRequired={true}
          label={"End Date"}
        /> */}
        {/* )} */}
        {/* <InputField
            type={"checkbox"}
            containerClassName={"mt-1"}
            label={"Perpetual"}
            id={"perpetual"}
            onChange={(e) => setIsPerpetual(e.target.checked)}
            hideRequired={true}
          /> */}
        <InputField
          type={"text"}
          placeholder={"Enter your signature here"}
          label={"Signatory Person Name"}
          name={"signatoryName"}
          id={"signature"}
          containerClassName={"xl:w-1/2"}
          hideRequired={true}
        />
      </div>

      <div className="flex justify-center">
        <Button
          type={"submit"}
          text={"Submit"}
          containerClassName={"mt-6 mx-auto"}
          // onClick={() => }
          disabled={submitted}
        />
      </div>

      {/* {showModal && ( */}
      <div className="opacity-0 relative -z-[9999999999999999]">
        <Modal>
          <Letterhead formData={formData} ref={letterHeadRef} />
        </Modal>
      </div>
      {/* )} */}
    </form>
  );
};

export default CreateRecordLabel;
