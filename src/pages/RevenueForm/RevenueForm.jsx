import React, { useContext, useRef, useState } from "react";
import InputField from "../../components/InputField/InputField";
import axios from "axios";
import Button from "../../components/Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { backendUrl, config } from "../../constants";
import Invoice from "../../components/Invoice/Invoice";
import SelectOptions from "../../components/SelectOptions/SelectOptions";
import generatePDF, { usePDF } from "react-to-pdf";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RevenueForm() {
  const navigate = useNavigate();
  const [gst, setGst] = useState(false);
  const [ruIndian, setRuIndian] = useState(false);
  const [aadharCard, setAadharCard] = useState("");
  const [aadharUrl, setAadharUrl] = useState("");
  const [panUrl, setPanUrl] = useState("");
  const [gstUrl, setGstUrl] = useState("");
  const [cancelledUrl, setCancelledUrl] = useState("");
  const [panCard, setPanCard] = useState("");
  const [gstCertificate, setGstCertificate] = useState("");
  const [cancelledCheque, setCancelledCheque] = useState("");
  const [signature, setSignature] = useState("");
  const [signatureUrl, setSignatureUrl] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const { token, userData } = useContext(ProfileContext);
  const [confirmed, setConfirmed] = useState(false);
  const [state, setState] = useState("");
  const invoiceRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [formBody, setFormBody] = useState({});
  const [accountType, setAccountType] = useState("");

  // console.log(data);

  const aadharCardhandle = (e) => {
    e.preventDefault();
    e.target.files[0] && setAadharCard(URL.createObjectURL(e.target.files[0]));
  };
  const panCardhandle = (e) => {
    e.preventDefault();
    e.target.files[0] && setPanCard(URL.createObjectURL(e.target.files[0]));
  };
  const gsthandle = (e) => {
    e.preventDefault();
    e.target.files[0] &&
      setGstCertificate(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0]);
  };
  const cancelledChequehandle = (e) => {
    e.preventDefault();
    e.target.files[0] &&
      setCancelledCheque(URL.createObjectURL(e.target.files[0]));
  };

  const signatureHandle = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    // console.log(reader);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      // img.onload = () => {
      //   // Set image dimensions
      //   console.log({ width: img.width, height: img.height });
      //   if (img.width <= 276 && img.height <= 118) {
      //     //   alert("perfect");
      //   } else {
      //     toast.error("Image should be less than or equal 276 X 118 pixels", {
      //       position: "bottom-center",
      //     });
      //   }
      // };
      //   img.src = e.target.result;
    };
    // e.target.files[0] && reader.readAsDataURL(e.target.files[0]);
    e.target.files[0] && setSignature(URL.createObjectURL(e.target.files[0]));
  };

  const imageUploading = async (urlbody, imageFile, setfile) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const response = await axios.post(
        `${backendUrl + urlbody}`,
        formData,
        config
      );
      const { data } = response;
      if (data.url) {
        setfile(data.url);
        return data.url; // This value is now being returned by the promise that `imageUploading` returns
      }
    } catch (err) {
      console.log(err.message);
      return null; // In case of error, return null or handle it as per your error handling logic
    }
  };

  const FormHandle = async (e) => {
    e.preventDefault();
    const form = e.target;

    const vendorName = form.vendorName.value;
    const invoiceNumber = form.invoiceNumber.value;
    const invoiceDate = form.invoiceDate.value;
    const address = form.address.value;
    const streetName = form.streetName.value;
    const landMark = form.landMark.value;
    const pinCode = form.pinCode.value;
    const city = form.city.value;
    const state = form.state.value;
    const gstinNumber = form.gctinNumber?.value;
    // const placeOfSupply = form.placeOfSupply.value;
    const cinNumber = form.cinNumber.value;
    const serviceAccount = form.serviceAccount?.value;
    const panNumber = form.panNumber.value;
    const taxableValue = form.taxableValue.value;
    const cgstAmount = form.cgstAmount?.value;
    const sgstAmount = form.sgstAmount?.value;
    const igstAmount = form.igstAmount?.value;
    const totalAmount = form.totalAmount.value;
    // const totalAmountWord = form.totalAmountWord.value;
    const bankName = form.bankName.value;
    const branch = form.branch.value;
    const accountType = form.accountType.value;
    const ifscCode = form.ifscCode.value;
    const beneficiaryName = form.beneficiaryName.value;
    const accountNumber = form.accountNumber.value;
    const confirmAccountNumber = form.confirmAccountNumber.value;
    const AadharCard = form.aadharCard.files[0];
    const PanCardFile = form.panCard.files[0];
    const GstFile = form.gst.files[0];
    const cancelledChequeFile = form.cancelledCheque.files[0];
    const signatureFile = form.signature.files[0];
    // console.log(taxableValue);

    const aadharCardUrl = await imageUploading(
      "upload-aadhar-cards",
      AadharCard,
      setAadharUrl
    );

    const panCardUrl = await imageUploading(
      "upload-pan-cards",
      PanCardFile,
      setPanUrl
    );
    const gstCertUrl = await imageUploading(
      "upload-gst-certificate",
      GstFile,
      setGstUrl
    );
    const cancelledChequeUrl = await imageUploading(
      "upload-cancelled-cheques",
      cancelledChequeFile,
      setCancelledUrl
    );

    const signatureUrl = await imageUploading(
      "upload-signature",
      signatureFile,
      setSignatureUrl
    );

    // console.log(aadharUrl);
    const body = {
      vendorName,
      invoiceNumber,
      invoiceDate,
      address,
      streetName,
      landMark,
      pinCode,
      city,
      state,
      gstinNumber,
      placeOfSupply,
      cinNumber,
      serviceAccount,
      panNumber,
      taxableValue,
      cgstAmount,
      sgstAmount,
      igstAmount,
      totalAmount,
      // totalAmountWord,
      bankName,
      branch,
      accountType,
      ifscCode,
      beneficiaryName,
      accountNumber,
      userName: userData.partner_name,
      emailId: userData.emailId,
      confirmAccountNumber,
      aadharUrl: aadharCardUrl,
      panUrl: panCardUrl,
      gstUrl: gstCertUrl,
      cancelledChequeUrl,
      signatureUrl,
    };

    setFormBody(body);

    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };

    console.log(body);
    setConfirmed(true);
  };

  const handlePdf = async () => {
    const pdf = await generatePDF(targetRef, {
      filename: `Invoice_of_${userData.first_name}_${userData.last_name}.pdf`,
      // overrides: {
      //   canvas: {
      //     height: (1500 * 72) / 96,
      //   },
      // },
    });
    // console.log(pdf);
    const formData = new FormData();
    formData.append("file", pdf.output("blob"));

    const config = {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    };

    const { data } = await axios.post(
      "https://api.forevisiondigital.in/store-invoice",
      formData,
      config
    );
    // console.log(data);
    const newBody = { ...formBody, pdfUrl: data.pdfUrl };
    console.log(newBody);

    axios
      .post(`${backendUrl}withdrawal-request`, newBody, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        // console.log(data);
        if (data.acknowledged) {
          // e.target.reset();
          setAadharCard("");
          setPanCard("");
          setGst("");
          setCancelledCheque("");

          setConfirmed(false);
          toast.success("Withdrawal Request Placed Successfully", {
            position: "bottom-center",
          });
          navigate("/");
        }
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <>
      {confirmed && (
        <div className="fixed top-0 left-0 backdrop-blur w-screen h-screen z-[9999] flex justify-center overflow-x-auto overflow-y-auto">
          <div className="bg-white w-[800px] h-[1119px] my-7 shadow-2xl rounded-lg relative">
            <button
              className="absolute -right-5 -top-5 text-heading-4"
              onClick={() => setConfirmed(false)}
            >
              &times;
            </button>
            <Invoice gst={gst} formBody={formBody} ref={targetRef} />

            <div className="flex justify-center">
              <Button
                type={"success"}
                text={"confirm"}
                containerClassName={"w-fit mt-3"}
                onClick={handlePdf}
              />
            </div>
          </div>
        </div>
      )}

      <section
        className={`w-full lg:w-4/6 mx-auto my-4 text-grey-dark ${
          confirmed && "overflow-y-hidden"
        }`}
      >
        <form
          onSubmit={FormHandle}
          className="px-3 md:px-[4rem] w-full md:mx-auto rounded-md shadow-xl bg-white"
        >
          <div className="pt-[4rem]">
            <div className=" mb-3">
              <h1 className="text-heading-4-bold pb-1">Revenue Withdraw</h1>
              <h1>Please fill the form out to initiate the request</h1>
            </div>
            <div className=" ">
              <h1>Are you registered under the CGST 2017 ?</h1>
              <label className="mr-2">
                <input
                  className="mr-2"
                  type="radio"
                  onClick={() => setGst(true)}
                  required
                  name="cgst"
                />
                Yes
              </label>
              <label className="mr-2">
                <input
                  className="mr-2"
                  type="radio"
                  onClick={() => setGst(false)}
                  required
                  name="cgst"
                />
                No
              </label>

              <h1>Are you a resident of India?</h1>
              <label className="mr-2">
                <input
                  className="mr-2"
                  type="radio"
                  onClick={() => setRuIndian(true)}
                  required
                  name="indian"
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  onClick={() => setRuIndian(false)}
                  required
                  name="indian"
                />
                No
              </label>
            </div>
          </div>

          {/* <fieldset> */}
          <div className="flex flex-col gap-3 bg-white mt-5">
            <div className="flex flex-col md:flex-row gap-3">
              <InputField
                name={"vendorName"}
                label={"Vendor Name*"}
                id={"vandorName"}
                type={"text"}
                required={gst}
                containerClassName={"w-full md:w-2/4"}
              />
              <InputField
                name={"invoiceNumber"}
                label={"Invoice Number*"}
                id={"invoiceNumber"}
                type={"text"}
                required={gst}
                containerClassName={"w-full md:w-1/4"}
              />
              <InputField
                name={"invoiceDate"}
                label={"Invoice Date*"}
                id={"invoiceDate"}
                type={"date"}
                // required={gst}
                value={
                  new Date().getFullYear() +
                  "-" +
                  String(new Date().getMonth() + 1).padStart(2, "0") +
                  "-" +
                  String(new Date().getDate()).padStart(2, "0")
                }
                disabled={true}
                containerClassName={"w-full md:w-1/4"}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <InputField
                name={"address"}
                label={"Address*"}
                id={"address"}
                required={gst}
                type={"address"}
                containerClassName={"w-full md:w-2/4"}
              />
              <InputField
                name={"streetName"}
                label={"Street Name"}
                id={"streetName"}
                type={"address"}
                required={gst}
                containerClassName={"w-full md:w-1/4"}
              />
              <InputField
                name={"landMark"}
                label={"Land Mark (Optional)"}
                id={"landMark"}
                type={"text"}
                required={gst}
                containerClassName={"w-full md:w-1/4"}
              />
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <InputField
                name={"pinCode"}
                label={"Pin Code*"}
                id={"pinCode"}
                type={"number"}
                required={gst}
                containerClassName={"w-full md:w-1/4"}
              />
              <InputField
                name={"city"}
                label={"City*"}
                id={"city"}
                required={gst}
                type={"address"}
                containerClassName={"w-full md:w-2/4"}
              />
              {ruIndian ? (
                <SelectOptions
                  label={"State*"}
                  name="state"
                  onChange={(e) => setState(e.target.value)}
                  options={[
                    "Andaman and Nicobar Islands",
                    "Andhra Pradesh",
                    "Arunachal Pradesh",
                    "Assam",
                    "Bihar",
                    "Chandigarh",
                    "Chhattisgarh",
                    "Dadra and Nagar Haveli",
                    "Daman and Diu",
                    "Delhi",
                    "Goa",
                    "Gujarat",
                    "Haryana",
                    "Himachal Pradesh",
                    "Jammu",
                    "Jharkhand",
                    "Karnataka",
                    "Kashmir",
                    "Kerala",
                    "Ladakh",
                    "Lakshadweep",
                    "Madhya Pradesh",
                    "Maharashtra",
                    "Manipur",
                    "Meghalaya",
                    "Mizoram",
                    "Nagaland",
                    "Odisha",
                    "Puducherry",
                    "Punjab",
                    "Rajasthan",
                    "Sikkim",
                    "Tamil Nadu",
                    "Telangana",
                    "Tripura",
                    "Uttarakhand",
                    "Uttar Pradesh",
                    "West Bengal",
                  ]}
                  id={"state"}
                  containerClassName={"w-full md:w-1/4"}
                />
              ) : (
                <InputField
                  type={"text"}
                  id={"state"}
                  name={"state"}
                  label={"State*"}
                  containerClassName={"w-full md:w-1/4"}
                />
              )}
            </div>
            {gst && (
              <div className="flex gap-3 flex-col md:flex-row mt-6">
                <InputField
                  name={"gctinNumber"}
                  label={"GSTIN Number*"}
                  id={"gctinNumber"}
                  type={"text"}
                  containerClassName={"w-full md:w-2/4"}
                  required={gst}
                />
                <InputField
                  name={"placeOfSupply"}
                  label={"Place of Supply*"}
                  id={"placeOfSuppl"}
                  type={"text"}
                  disabled={state === "Kashmir" || state === "West Bengal"}
                  value={
                    state === "Kashmir" || state === "West Bengal"
                      ? state
                      : placeOfSupply
                  }
                  onChange={(e) => setPlaceOfSupply(e.target.value)}
                  containerClassName={gst ? "w-full md:w-2/4" : "w-full"}
                  required={gst}
                />
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-3">
              <InputField
                name={"cinNumber"}
                label={"CIN Number"}
                id={"cinNumber"}
                type={"text"}
                // required={gst}
                containerClassName={`${gst ? "w-full md:w-2/4" : "w-full"}`}
              />
              {gst && (
                <InputField
                  name={"serviceAccount"}
                  label={"Service Accounting Number (SAC)*"}
                  id={"serviceAccount"}
                  type={"text"}
                  containerClassName={"w-full md:w-2/4"}
                  required={gst}
                />
              )}
            </div>

            {/* {gst && (
              <div className="flex gap-3 mb-5">
                {state === "West Bengal" && (
                  <>
                    <InputField
                      name={"cgstAmount"}
                      label={"CGST Amount"}
                      id={"cgstAmount"}
                      type={"number"}
                      containerClassName={"w-1/2"}
                      required={gst && state === "West Bengal"}
                    />
                    <InputField
                      name={"sgstAmount"}
                      label={"SGST Amount"}
                      id={"sgstAmount"}
                      type={"number"}
                      containerClassName={"w-1/2"}
                      required={gst && state === "West Bengal"}
                    />
                  </>
                )}
                {state !== "West Bengal" && (
                  <InputField
                    name={"igstAmount"}
                    label={"IGST Amount"}
                    id={"igstAmount"}
                    type={"number"}
                    containerClassName={"w-full"}
                    required={gst && state !== "West Bengal"}
                  />
                )}
              </div>
            )} */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
              <InputField
                name={"panNumber"}
                label={"PAN Number*"}
                id={"panNumber"}
                type={"text"}
                required={gst}
                containerClassName={"w-full"}
              />
              {/* <InputField
                name={"taxableValue"}
                label={"Total Amount"}
                id={"totalAmount"}
                type={"text"}
                containerClassName={"w-full"}
                required={gst}
              /> */}

              <InputField
                name={"totalAmount"}
                label={"Taxable Value"}
                id={"taxableValue"}
                type={"number"}
                required={gst}
                value={Math.floor(
                  userData.lifetimeRevenue -
                    (userData.lifetimeDisbursed || 0) || 0
                )}
                disabled={true}
                containerClassName={"w-full"}
              />
            </div>
            {/* <InputField
              name={"totalAmountWord"}
              label={"Total Amount (in Word)"}
              id={"totalAmountWord"}
              required={gst}
              type={"text"}
              containerClassName={"w-2/5"}
            /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                name={"bankName"}
                label={"Name of the Bank*"}
                id={"bankName"}
                required={gst}
                type={"text"}
                // containerClassName={"w-full md:w-1/2"}
              />
              <InputField
                name={"branch"}
                label={"Branch*"}
                id={"branch"}
                type={"text"}
                required={gst}
                // containerClassName={"w-1/2"}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <SelectOptions
                name={"accountType"}
                label={"Account Type*"}
                required={gst}
                id={"accountType"}
                type={"text"}
                options={["Savings", "Current"]}
                onChange={(e) => setAccountType(e.target.value)}
                // containerClassName={"w-1/3"}
              />
              <InputField
                name={"ifscCode"}
                label={"IFSC*"}
                id={"ifscCode"}
                type={"text"}
                required={gst}
                // containerClassName={"w-1/3"}
              />
              <InputField
                name={"beneficiaryName"}
                label={"Beneficiary Name*"}
                id={"beneficiaryName"}
                type={"text"}
                required={gst}
                // containerClassName={"w-1/3"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                name={"accountNumber"}
                label={"Account Number*"}
                id={"accountNumber"}
                type={"number"}
                required={gst}
                // containerClassName={"w-full"}
              />
              <InputField
                name={"confirmAccountNumber"}
                label={"Confirm Account Number*"}
                id={"confirmAccountNumber"}
                type={"number"}
                required={gst}
                // containerClassName={"w-full"}
              />
            </div>
            <div className="flex flex-wrap w-7/12 mx-auto">
              <div className="w-full md:w-1/2 aspect-square p-1">
                <label className="text-grey mb-1" htmlFor="aadharCard">
                  Aadhar Card / Any Government Issued ID
                </label>
                <div className="h-full border-dashed border-4 border-grey rounded-[5px] cursor-pointer flex items-center justify-center">
                  <label htmlFor="aadharCard">
                    {aadharCard.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={aadharCard}
                        alt=""
                      />
                    ) : (
                      <p className="inline-block text-center text-heading-5-bold cursor-pointer">
                        +
                      </p>
                    )}
                    <input
                      className="hidden"
                      name="aadharCard"
                      id="aadharCard"
                      required
                      type="file"
                      onChange={aadharCardhandle}
                    />{" "}
                  </label>
                </div>
              </div>
              <div className="w-full md:w-1/2 aspect-square p-1">
                <label className="text-grey mb-1" htmlFor="panCard">
                  PAN Card
                </label>
                <div className="h-full border-dashed border-4 border-grey rounded-[5px] cursor-pointer flex items-center justify-center">
                  <label htmlFor="panCard">
                    {panCard.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={panCard}
                        alt=""
                      />
                    ) : (
                      <p className="inline-block text-center text-heading-5-bold cursor-pointer">
                        +
                      </p>
                    )}
                    <input
                      className="hidden"
                      name="panCard"
                      id="panCard"
                      type="file"
                      required={gst}
                      onChange={panCardhandle}
                    />{" "}
                  </label>
                </div>
              </div>
              {gst && (
                <div className="w-full md:w-1/2 aspect-square p-1">
                  <label className="text-grey mb-1" htmlFor="GovtID">
                    <p>GST certificate</p>
                    {ruIndian && (
                      <div className="w-1/2 p-1">
                        <p className="teeractive-light-destructive pt-1 text-[12px]">
                          Please fill on the field with GST certificate
                        </p>
                      </div>
                    )}
                  </label>
                  <div className="h-full border-dashed border-4 border-grey rounded-[5px] cursor-pointer flex items-center justify-center">
                    <label htmlFor="gst">
                      {gstCertificate.length ? (
                        <img
                          className="w-full h-[5rem] mx-auto rounded-xl"
                          src={gstCertificate}
                          alt=""
                        />
                      ) : (
                        <p className="inline-block text-center text-heading-5-bold cursor-pointer">
                          +
                        </p>
                      )}
                      <input
                        className="hidden"
                        name="gst"
                        id="gst"
                        type="file"
                        required={ruIndian}
                        onChange={gsthandle}
                      />{" "}
                    </label>
                  </div>
                </div>
              )}
              <div className="w-full aspect-square md:w-1/2 p-1">
                <label className="text-grey mb-1" htmlFor="cancelledCheque">
                  <p>Cancelled Cheque</p>
                  {ruIndian && (
                    <p className="text-interactive-light-destructive pt-1 text-[12px]">
                      Please fill on the field with Cancelled Cheque
                    </p>
                  )}
                </label>
                <div className="h-full border-dashed border-4 border-grey rounded-[5px] cursor-pointer flex items-center justify-center">
                  <label htmlFor="cancelledCheque">
                    {cancelledCheque.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={cancelledCheque}
                        alt=""
                      />
                    ) : (
                      <p className="inline-block text-center text-heading-5-bold cursor-pointer">
                        +
                      </p>
                    )}
                    <input
                      className="hidden"
                      name="cancelledCheque"
                      id="cancelledCheque"
                      type="file"
                      required
                      onChange={cancelledChequehandle}
                    />{" "}
                  </label>
                </div>
              </div>
              <div className="w-1/2 p-1 aspect-square">
                <div className="w-full mx-auto">
                  <label className="text-grey" htmlFor="signature">
                    <p>Signature</p>
                    {/* {ruIndian && (
                  <p className="text-interactive-light-destructive pt-1 text-[12px]">
                    Please fill on the field with Signature
                  </p>
                )} */}
                  </label>
                </div>
                <div className="w-full h-full border-dashed border-4 border-grey rounded-[5px] cursor-pointer flex items-center justify-center">
                  <label htmlFor="signature">
                    {signature.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={signature}
                        alt=""
                      />
                    ) : (
                      <p className="inline-block text-center text-heading-5-bold cursor-pointer">
                        +
                      </p>
                    )}
                    <input
                      className="hidden"
                      name="signature"
                      id="signature"
                      type="file"
                      required={true}
                      onChange={signatureHandle}
                    />{" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* </fieldset> */}

          <div className="py-4 text-center">
            {/* <button
              type="submit"
              className=" bottom-3 bg-primary-light p-1 rounded-md text-white"
            >
              SAVE AND NEXT
            </button> */}

            <Button type={"submit"}>Submit</Button>
          </div>
        </form>
      </section>
    </>
  );
}

export default RevenueForm;
