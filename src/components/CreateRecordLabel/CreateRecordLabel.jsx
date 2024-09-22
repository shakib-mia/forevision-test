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
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";

const CreateRecordLabel = ({ setShowRecordLabelForm }) => {
  const [selectedCode, setSelectedCode] = useState("91");
  const [isPerpetual, setIsPerpetual] = useState(false);
  const { token, userData } = useContext(ProfileContext);
  const [recordLabelData, setRecordLabelData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const letterHeadRef = useRef(null);
  const location = useLocation();

  const generatePDF = async () => {
    const element = letterHeadRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    return pdf.output("blob");
  };

  const handleRecordLabelSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const data = {
      "Sub-Label Name": e.target.recordLabelName.value,
      phoneNo: e.target.phoneNo.value,
      status: "Requested",
      "Email ID": userData.user_email,
      address: e.target.address.value,
      "Start Date": e.target.startDate.value,
      signatoryName: e.target.signatoryName.value,
    };

    setRecordLabelData(data);

    try {
      const pdfBlob = await generatePDF();
      const fileName = `LetterHead of ${data["Sub-Label Name"]}.pdf`;

      // Offer download to user
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = fileName;
      link.click();

      // Upload PDF
      const formData = new FormData();
      formData.append("file", pdfBlob, fileName);

      const res = await axios.post(backendUrl + "upload-letterhead", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });

      // console.log(res);

      // Submit record label data
      const config = { headers: { token } };
      const response = await axios.post(
        backendUrl + "record-labels",
        { ...data, pdf: res.data.url },
        config
      );

      if (response.data.acknowledged) {
        e.target.reset();
        setSubmitted(false);

        Swal.fire({
          title: "Record Label Submitted Successfully",
          text: "The PDF has been downloaded and uploaded to the server.",
          icon: "success",
          customClass: {
            confirmButton: "custom-class-settings",
          },
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data || "An error occurred. Please try again.",
        {
          position: "bottom-center",
        }
      );
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <form
      className={`${
        location.pathname === "/home" || location.pathname === "/"
          ? "bg-grey-light p-4 rounded-2xl"
          : "bg-white p-4 rounded w-11/12 lg:w-1/2 h-5/6 overflow-auto relative"
      }`}
      onSubmit={handleRecordLabelSubmit}
    >
      {location.pathname === "/home" || location.pathname === "/" || (
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
          location.pathname === "/home" || location.pathname === "/"
            ? "text-heading-4-bold text-grey-dark mb-2"
            : "text-heading-5-bold text-center mt-4"
        }
      >
        Create A New Record Label
      </h5>

      {/* Your existing form fields */}
      <InputField
        type={"text"}
        placeholder={"Record Label Name"}
        label={"Name"}
        name={"recordLabelName"}
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
          text={submitted ? "Submitting..." : "Submit"}
          containerClassName={"mt-6 mx-auto"}
          disabled={submitted}
        />
      </div>

      <div className="opacity-0 relative -z-[9999999999999999]">
        <Modal>
          <div ref={letterHeadRef}>
            <Letterhead formData={recordLabelData} />
          </div>
        </Modal>
      </div>
    </form>
  );
};

export default CreateRecordLabel;
