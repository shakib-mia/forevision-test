import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";

function RevenueFrom() {
  const [cgst, setCgst] = useState(false);
  const [ruIndian, setRuIndian] = useState(false);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [govetID, setGovetID] = useState("");
  const [cancelledCheque, setCancelledCheque] = useState("");

  const imghandle1 = (e) => {
    e.preventDefault();
    e.target.files[0] && setImg1(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };
  const imghandle2 = (e) => {
    e.preventDefault();
    e.target.files[0] && setImg2(URL.createObjectURL(e.target.files[0]));
  };
  const govetIDhandle = (e) => {
    e.preventDefault();
    e.target.files[0] && setGovetID(URL.createObjectURL(e.target.files[0]));
  };
  const cancelledChequehandle = (e) => {
    e.preventDefault();
    e.target.files[0] &&
      setCancelledCheque(URL.createObjectURL(e.target.files[0]));
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
    const img1 = form.img1.files[0];
    const img2 = form.img2.files[0];
    const govetID = form.govetID.files[0];
    const cancelledCheque = form.cancelledCheque.files[0];

    console.log({
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
      img1,
      img2,
      govetID,
      cancelledCheque,
    });
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
                  <label htmlFor="img1">
                    {img1.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={img1}
                        alt=""
                      />
                    ) : (
                      <p className="pt-3 text-center text-heading-5-bold">+</p>
                    )}
                    <input
                      className="hidden"
                      name="img1"
                      id="img1"
                      type="file"
                      onChange={imghandle1}
                    />{" "}
                  </label>
                </div>
                <label htmlFor="img2">img2</label>
              </div>
              <div className="w-2/5">
                <div className="w-full h-[6rem] border-dashed border-4 borderg-gray-400 rounded-[5px] ">
                  <label htmlFor="img2">
                    {img2.length ? (
                      <img
                        className="w-full h-[5rem] mx-auto rounded-xl"
                        src={img2}
                        alt=""
                      />
                    ) : (
                      <p className="pt-3 text-center text-heading-5-bold">+</p>
                    )}
                    <input
                      className="hidden"
                      name="img2"
                      id="img2"
                      type="file"
                      onChange={imghandle2}
                    />{" "}
                  </label>
                </div>
                <label htmlFor="img2">img2</label>
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
                  {ruIndian && (
                    <>
                      <p>Govet ID</p>
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
                  {ruIndian && (
                    <>
                      <p>Cancelled Cheque</p>
                      <p className="text-interactive-light-destructive pt-1 text-[12px]">
                        Please fill on the field with Cancelled Cheque
                      </p>
                    </>
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
