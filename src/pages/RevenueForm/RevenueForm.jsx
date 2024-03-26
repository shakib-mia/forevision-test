import React, { Profiler, useContext, useState } from "react";
import InputField from "../../components/InputField/InputField";
import axios from "axios";
import Button from "../../components/Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { backendUrl, config } from "../../constants";

function RevenueForm() {
  const [cgst, setCgst] = useState(false);
  const [ruIndian, setRuIndian] = useState(false);
  const [aadharCard, setAadharCard] = useState("");
  const [aadharUrl, setAadharUrl] = useState("");
  const [panUrl, setPanUrl] = useState("");
  const [gstUrl, setGstUrl] = useState("");
  const [cancelledUrl, setCancelledUrl] = useState("");
  const [panCard, setPanCard] = useState("");
  const [gst, setGst] = useState("");
  const [cancelledCheque, setCancelledCheque] = useState("");
  const { token, userData } = useContext(ProfileContext);
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
    e.target.files[0] && setGst(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0]);
  };
  const cancelledChequehandle = (e) => {
    e.preventDefault();
    e.target.files[0] &&
      setCancelledCheque(URL.createObjectURL(e.target.files[0]));
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
    const gctinNumber = form.gctinNumber.value;
    const placeOfSupply = form.placeOfSupply.value;
    const cinNumber = form.cinNumber.value;
    const serviceAccount = form.serviceAccount.value;
    const panNumber = form.panNumber.value;
    const taxableValue = form.taxableValue.value;
    const cgstAmount = form.cgstAmount.value;
    const sgstAmount = form.sgstAmount.value;
    const igstAmount = form.igstAmount.value;
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
      gctinNumber,
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
      cancelledUrl: cancelledChequeUrl,
    };

    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };

    console.log(body);

    axios
      .post(`${backendUrl}withdrawal-request`, body, config)
      .then(({ data }) => {
        // console.log(data);
        if (data.acknowledged) {
          e.target.reset();
          setAadharCard("");
          setPanCard("");
          setGst("");
          setCancelledCheque("");
        }
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <>
      <section className="w-4/6 mx-auto my-4 text-grey-dark">
        <form
          onSubmit={FormHandle}
          className="container px-[4rem] mx-auto rounded-md shadow-xl bg-white"
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
                  onClick={() => setCgst(true)}
                  required
                  name="cgst"
                />
                Yes
              </label>
              <label className="mr-2">
                <input
                  className="mr-2"
                  type="radio"
                  onClick={() => setCgst(false)}
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
            <div className="flex gap-3">
              <InputField
                name={"vendorName"}
                label={"Vendor Name*"}
                id={"vandorName"}
                type={"text"}
                required={cgst}
                containerClassName={"w-2/4"}
              />
              <InputField
                name={"invoiceNumber"}
                label={"Invoice Number*"}
                id={"invoiceNumber"}
                type={"text"}
                required={cgst}
                containerClassName={"w-1/4"}
              />
              <InputField
                name={"invoiceDate"}
                label={"Invoice Date*"}
                id={"invoiceDate"}
                type={"date"}
                required={cgst}
                containerClassName={"w-1/4"}
              />
            </div>
            <div className="flex gap-3">
              <InputField
                name={"address"}
                label={"Address*"}
                id={"address"}
                required={cgst}
                type={"address"}
                containerClassName={"w-2/4"}
              />
              <InputField
                name={"streetName"}
                label={"Street Name"}
                id={"streetName"}
                type={"address"}
                required={cgst}
                containerClassName={"w-1/4"}
              />
              <InputField
                name={"landMark"}
                label={"Land Mark (Optional)"}
                id={"landMark"}
                type={"text"}
                required={cgst}
                containerClassName={"w-1/4"}
              />
            </div>
            <div className="flex gap-3">
              <InputField
                name={"pinCode"}
                label={"Pin Code*"}
                id={"pinCode"}
                type={"number"}
                required={cgst}
                containerClassName={"w-1/4"}
              />
              <InputField
                name={"city"}
                label={"City*"}
                id={"city"}
                required={cgst}
                type={"address"}
                containerClassName={"w-2/4"}
              />
              <InputField
                name={"state"}
                label={"State*"}
                id={"state"}
                required={cgst}
                type={"text"}
                containerClassName={"w-1/4"}
              />
            </div>
            <div className="flex gap-3 mt-6">
              <InputField
                name={"gctinNumber"}
                label={"GSTIN Number*"}
                id={"gctinNumber"}
                type={"text"}
                containerClassName={"w-2/4"}
                required={cgst}
              />
              <InputField
                name={"placeOfSupply"}
                label={"Place of Supply*"}
                id={"placeOfSuppl"}
                type={"text"}
                containerClassName={"w-2/4"}
                required={cgst}
              />
            </div>
            <div className="flex gap-3">
              <InputField
                name={"cinNumber"}
                label={"CIN Number*"}
                id={"cinNumber"}
                type={"text"}
                required={cgst}
                containerClassName={"w-2/4"}
              />
              <InputField
                name={"serviceAccount"}
                label={"Service Accounting Number (SAC)*"}
                id={"serviceAccount"}
                type={"text"}
                containerClassName={"w-2/4"}
                required={cgst}
              />
            </div>

            <div className="flex gap-3 mb-5">
              <InputField
                name={"cgstAmount"}
                label={"CGST Amount"}
                id={"cgstAmount"}
                type={"text"}
                containerClassName={"w-1/3"}
                required={cgst}
              />
              <InputField
                name={"sgstAmount"}
                label={"SGST Amount"}
                id={"sgstAmount"}
                type={"text"}
                containerClassName={"w-1/3"}
                required={cgst}
              />
              <InputField
                name={"igstAmount"}
                label={"IGST Amount"}
                id={"igstAmount"}
                type={"text"}
                containerClassName={"w-1/3"}
                required={cgst}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <InputField
                name={"panNumber"}
                label={"PAN Number*"}
                id={"panNumber"}
                type={"text"}
                required={cgst}
                containerClassName={"w-full"}
              />
              <InputField
                name={"taxableValue"}
                label={"Taxable Value*"}
                id={"taxableValue"}
                type={"text"}
                containerClassName={"w-full"}
                required={cgst}
              />

              <InputField
                name={"totalAmount"}
                label={"Total Amount (in numbers)"}
                id={"totalAmount"}
                type={"number"}
                required={cgst}
                value={Math.floor(
                  userData.lifetimeRevenue - (userData.lifetimeDisbursed || 0)
                )}
                disabled={true}
                containerClassName={"w-full"}
              />
            </div>
            {/* <InputField
              name={"totalAmountWord"}
              label={"Total Amount (in Word)"}
              id={"totalAmountWord"}
              required={cgst}
              type={"text"}
              containerClassName={"w-2/5"}
            /> */}
            <div className="flex gap-3">
              <InputField
                name={"bankName"}
                label={"Name of the Bank*"}
                id={"bankName"}
                required={cgst}
                type={"text"}
                containerClassName={"w-1/2"}
              />
              <InputField
                name={"branch"}
                label={"Branch*"}
                id={"branch"}
                type={"text"}
                required={cgst}
                containerClassName={"w-1/2"}
              />
            </div>
            <div className="flex gap-3">
              <InputField
                name={"accountType"}
                label={"Account Type*"}
                required={cgst}
                id={"accountType"}
                type={"text"}
                containerClassName={"w-1/3"}
              />
              <InputField
                name={"ifscCode"}
                label={"IFSC*"}
                id={"ifscCode"}
                type={"text"}
                required={cgst}
                containerClassName={"w-1/3"}
              />
              <InputField
                name={"beneficiaryName"}
                label={"Beneficiary Name*"}
                id={"beneficiaryName"}
                type={"text"}
                required={cgst}
                containerClassName={"w-1/3"}
              />
            </div>

            <div className="flex gap-3">
              <InputField
                name={"accountNumber"}
                label={"Account Number*"}
                id={"accountNumber"}
                type={"number"}
                required={cgst}
                containerClassName={"w-full"}
              />
              <InputField
                name={"confirmAccountNumber"}
                label={"Confirm Account Number*"}
                id={"confirmAccountNumber"}
                type={"text"}
                required={cgst}
                containerClassName={"w-full"}
              />
            </div>
            <div className="flex flex-wrap">
              <div className="w-1/2 p-1">
                <label className="text-grey mb-1" htmlFor="aadharCard">
                  Aadhar Card / Any Government Issued ID
                </label>
                <div className="h-[6rem] border-dashed border-4 border-grey rounded-[5px]">
                  <label htmlFor="aadharCard">
                    {aadharCard.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={aadharCard}
                        alt=""
                      />
                    ) : (
                      <p className="pt-3 text-center text-heading-5-bold">+</p>
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
              <div className="w-1/2 p-1">
                <label className="text-grey mb-1" htmlFor="panCard">
                  PAN Card
                </label>
                <div className="h-[6rem] border-dashed border-4 border-grey rounded-[5px] ">
                  <label htmlFor="panCard">
                    {panCard.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={panCard}
                        alt=""
                      />
                    ) : (
                      <p className="pt-3 text-center text-heading-5-bold">+</p>
                    )}
                    <input
                      className="hidden"
                      name="panCard"
                      id="panCard"
                      type="file"
                      required={cgst}
                      onChange={panCardhandle}
                    />{" "}
                  </label>
                </div>
              </div>
              <div className="w-1/2 p-1">
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
                <div className="h-[6rem] border-dashed border-4 border-grey rounded-[5px]">
                  <label htmlFor="gst">
                    {gst.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={gst}
                        alt=""
                      />
                    ) : (
                      <p className="pt-3 text-center text-heading-5-bold">+</p>
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
              <div className="w-1/2 p-1">
                <label className="text-grey mb-1" htmlFor="cancelledCheque">
                  <p>Cancelled Cheque</p>
                  {ruIndian && (
                    <p className="text-interactive-light-destructive pt-1 text-[12px]">
                      Please fill on the field with Cancelled Cheque
                    </p>
                  )}
                </label>
                <div className="h-[6rem] border-dashed border-4 border-grey rounded-[5px]">
                  <label htmlFor="cancelledCheque">
                    {cancelledCheque.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={cancelledCheque}
                        alt=""
                      />
                    ) : (
                      <p className="pt-3 text-center text-heading-5-bold">+</p>
                    )}
                    <input
                      className="hidden"
                      name="cancelledCheque"
                      id="cancelledCheque"
                      type="file"
                      required={true}
                      onChange={cancelledChequehandle}
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
