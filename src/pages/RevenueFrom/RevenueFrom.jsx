import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import axios from "axios";

function RevenueFrom() {
  const [cgst, setCgst] = useState(false);
  const [ruIndian, setRuIndian] = useState(false);
  const [aadharCard, setAadharCard] = useState("");
  const [panCard, setPanCard] = useState("");
  const [govetID, setGovetID] = useState("");
  const [cancelledCheque, setCancelledCheque] = useState("");

  const aadharCardhandle = (e) => {
    e.preventDefault();
    e.target.files[0] && setAadharCard(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    e.target.files[0] &&
      axios
        .post(`https://api.forevisiondigital.in/upload-aadhar-cards`, formData)
        .then(({ data }) => {
          console.log(data.url);
          if (data.url) {
            setAadharCard(data.url);
          }
        })
        .catch((err) => console.log(err.message));
  };
  const panCardhandle = (e) => {
    e.preventDefault();
    e.target.files[0] && setPanCard(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    e.target.files[0] &&
      axios
        .post(`https://api.forevisiondigital.in/upload-pan-cards`, formData)
        .then(({ data }) => {
          console.log(data.url);
          if (data.url) {
            setPanCard(data.url);
          }
        })
        .catch((err) => console.log(err.message));
  };
  const govetIDhandle = (e) => {
    e.preventDefault();
    e.target.files[0] && setGovetID(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    e.target.files[0] &&
      axios
        .post(
          `https://api.forevisiondigital.in/upload-gst-certificate`,
          formData
        )
        .then(({ data }) => {
          console.log(data.url);
          if (data.url) {
            setGovetID(data.url);
          }
        })
        .catch((err) => console.log(err.message));
    console.log(govetID);
  };
  const cancelledChequehandle = (e) => {
    e.preventDefault();
    e.target.files[0] &&
      setCancelledCheque(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    e.target.files[0] &&
      axios
        .post(
          `https://api.forevisiondigital.in/upload-cancelled-cheques`,
          formData
        )
        .then(({ data }) => {
          console.log(data.url);
          if (data.url) {
            setCancelledCheque(data.url);
          }
        })
        .catch((err) => console.log(err.message));
  };

  const FormHandle = (e) => {
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
    const totalAmountWord = form.totalAmountWord.value;
    const bankName = form.bankName.value;
    const branch = form.branch.value;
    const accountType = form.accountType.value;
    const ifscCode = form.ifscCode.value;
    const beneficiaryName = form.beneficiaryName.value;
    const accountNumber = form.accountNumber.value;
    const confirmAccountNumber = form.confirmAccountNumber.value;

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
      totalAmountWord,
      bankName,
      branch,
      accountType,
      ifscCode,
      beneficiaryName,
      accountNumber,
      confirmAccountNumber,
      aadharCard,
      panCard,
      govetID,
      cancelledCheque,
    };
    console.log(body);
    // const config = {
    //   headers: {
    //     token: sessionStorage.getItem("token") || token,
    //   },
    // };

    // axios
    //   .get(`https://api.forevisiondigital.in/withdrawal-request`, body, config)
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch((e) => console.log(e.message));
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
              <h1>Please fill tha form out to initiate the request</h1>
            </div>
            <div className=" ">
              <h1>Are you registered under the CGST 2017 ?</h1>
              <label className="mr-2">
                <input
                  className="mr-2"
                  type="radio"
                  onClick={() => setCgst(true)}
                  name="cgst"
                />
                Yes
              </label>
              <label className="mr-2">
                <input
                  className="mr-2"
                  type="radio"
                  onClick={() => setCgst(false)}
                  name="cgst"
                />
                No
              </label>

              <h1>Are you, a resident of India....?</h1>
              <label className="mr-2">
                <input
                  className="mr-2"
                  type="radio"
                  onClick={() => setRuIndian(true)}
                  name="indian"
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  onClick={() => setRuIndian(false)}
                  name="indian"
                />
                No
              </label>
            </div>
          </div>

          <fieldset>
            <div className="flex flex-wrap gap-3 bg-white">
              <InputField
                name={"vendorName"}
                label={"Vendor Name*"}
                id={"vandorName"}
                type={"text"}
                placeholder={"ForeVision Digital"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"invoiceNumber"}
                label={"Invoice Number*"}
                id={"invoiceNumber"}
                type={"text"}
                placeholder={"420xxxxxxx"}
                containerClassName={"w-1/5"}
              />
              <InputField
                name={"invoiceDate"}
                label={"Invoice Date*"}
                id={"invoiceDate"}
                type={"date"}
                placeholder={"04-Mar-2024"}
                containerClassName={"w-1/5"}
              />
              <InputField
                name={"address"}
                label={"Address*"}
                id={"address"}
                type={"address"}
                placeholder={"Dhangdhinguri"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"streetName"}
                label={"Street Name"}
                id={"streetName"}
                type={"address"}
                placeholder={"RaserKuthi"}
                containerClassName={"w-1/5"}
              />
              <InputField
                name={"landMark"}
                label={"Land Mark (Optional)"}
                id={"landMark"}
                type={"text"}
                placeholder={"Land Mark"}
                containerClassName={"w-1/5"}
              />
              <InputField
                name={"pinCode"}
                label={"Pin Code*"}
                id={"pinCode"}
                type={"number"}
                placeholder={"518462"}
                containerClassName={"w-1/5"}
              />
              <InputField
                name={"city"}
                label={"City*"}
                id={"city"}
                type={"address"}
                placeholder={"COOCHBEHAR"}
                containerClassName={"w-1/5"}
              />
              <InputField
                name={"state"}
                label={"State*"}
                id={"state"}
                type={"text"}
                placeholder={"WEST BANGAL"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"gctinNumber"}
                label={"GSTIN Number*"}
                id={"gctinNumber"}
                type={"text"}
                placeholder={"374FCFCFCF34874KK"}
                containerClassName={"w-2/5"}
                required={cgst ? true : false}
              />
              <InputField
                name={"placeOfSupply"}
                label={"Place of Supply*"}
                id={"placeOfSuppl"}
                type={"text"}
                placeholder={"MUMBAI MAHARASHTRA"}
                containerClassName={"w-2/5"}
                required={cgst ? true : false}
              />
              <InputField
                name={"cinNumber"}
                label={"CIN Number*"}
                id={"cinNumber"}
                type={"text"}
                placeholder={"NA"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"serviceAccount"}
                label={"Service Accounting Number (SAC)*"}
                id={"serviceAccount"}
                type={"text"}
                placeholder={"9945515"}
                containerClassName={"w-2/5"}
                required={cgst ? true : false}
              />
              <InputField
                name={"panNumber"}
                label={"PAN Number*"}
                id={"panNumber"}
                type={"text"}
                placeholder={"BHADC5451D"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"taxableValue"}
                label={"Taxable Value*"}
                id={"taxableValue"}
                type={"text"}
                placeholder={"51,145"}
                containerClassName={"w-1/5"}
                required={cgst ? true : false}
              />
              <InputField
                name={"cgstAmount"}
                label={"CGST Amount"}
                id={"cgstAmount"}
                type={"text"}
                placeholder={""}
                containerClassName={"w-1/5"}
                required={cgst ? true : false}
              />
              <InputField
                name={"sgstAmount"}
                label={"SGST Amount"}
                id={"sgstAmount"}
                type={"text"}
                placeholder={" "}
                containerClassName={"w-1/5"}
                required={cgst ? true : false}
              />
              <InputField
                name={"igstAmount"}
                label={"IGST Amount"}
                id={"igstAmount"}
                type={"text"}
                placeholder={"5,515"}
                containerClassName={"w-2/5"}
                required={cgst ? true : false}
              />
              <InputField
                name={"totalAmount"}
                label={"Total Amount (in numbers)"}
                id={"totalAmount"}
                type={"number"}
                placeholder={"13,359"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"totalAmountWord"}
                label={"Total Amount (in Word)"}
                id={"totalAmountWord"}
                type={"text"}
                placeholder={"Thirteen Thousand Three Hundred And Nine Only"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"bankName"}
                label={"Name of the Bank*"}
                id={"bankName"}
                type={"text"}
                placeholder={"BANK OF BARODA"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"branch"}
                label={"Branch*"}
                id={"branch"}
                type={"text"}
                placeholder={"COOCH BEHAR"}
                containerClassName={"w-1/5"}
              />
              <InputField
                name={"accountType"}
                label={"Account Type*"}
                id={"accountType"}
                type={"text"}
                placeholder={"CURRENT"}
                containerClassName={"w-1/5"}
              />
              <InputField
                name={"ifscCode"}
                label={"IFSC*"}
                id={"ifscCode"}
                type={"text"}
                placeholder={"ABSBDBSCOCOHE"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"beneficiaryName"}
                label={"Beneficiary Name*"}
                id={"beneficiaryName"}
                type={"text"}
                placeholder={"FOREVISON DIGITAL"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"accountNumber"}
                label={"Account Number*"}
                id={"accountNumber"}
                type={"number"}
                placeholder={"515151562625626"}
                containerClassName={"w-2/5"}
              />
              <InputField
                name={"confirmAccountNumber"}
                label={"Confirm Account Number*"}
                id={"confirmAccountNumber"}
                type={"text"}
                placeholder={"1515151515151515"}
                containerClassName={"w-2/5"}
              />
              <div className="w-2/5">
                <div className="w-full h-[6rem] border-dashed border-4 borderg-gray-400 rounded-[5px]">
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
                      type="file"
                      onChange={aadharCardhandle}
                    />{" "}
                  </label>
                </div>
                <label htmlFor="aadharCard">Aadhar Card</label>
              </div>
              <div className="w-2/5">
                <div className="w-full h-[6rem] border-dashed border-4 borderg-gray-400 rounded-[5px] ">
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
                      onChange={panCardhandle}
                    />{" "}
                  </label>
                </div>
                <label htmlFor="panCard">PAN Card</label>
              </div>
              <div className="w-2/5">
                <div className="w-full h-[6rem] border-dashed border-4 borderg-gray-400 rounded-[5px]">
                  <label htmlFor="govetID">
                    {govetID.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={govetID}
                        alt=""
                      />
                    ) : (
                      <p className="pt-3 text-center text-heading-5-bold">+</p>
                    )}
                    <input
                      className="hidden"
                      name="govetID"
                      id="govetID"
                      type="file"
                      required={ruIndian}
                      onChange={govetIDhandle}
                    />{" "}
                  </label>
                </div>
                <label htmlFor="govetID">
                  <p>Govet ID</p>
                  {ruIndian && (
                    <>
                      <p className="text-interactive-light-destructive pt-1 text-[12px]">
                        Please fill on the field with Govet ID
                      </p>
                    </>
                  )}
                </label>
              </div>
              <div className="w-2/5">
                <div className="w-full h-[6rem] border-dashed border-4 borderg-gray-400 rounded-[5px]">
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
                      required={ruIndian}
                      onChange={cancelledChequehandle}
                    />{" "}
                  </label>
                </div>
                <label htmlFor="cancelledCheque">
                  <p>Cancelled Cheque</p>
                  {ruIndian && (
                    <p className="text-interactive-light-destructive pt-1 text-[12px]">
                      Please fill on the field with Cancelled Cheque
                    </p>
                  )}
                </label>
              </div>
            </div>
          </fieldset>

          <div className="py-4 text-center">
            <button
              type="submit"
              className=" bottom-3 bg-primary-light p-1 rounded-md text-white"
            >
              SAVE AND NEXT
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default RevenueFrom;
