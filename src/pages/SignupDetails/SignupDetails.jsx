import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import check from "./../../assets/icons/checkbox.webp";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../constants";

const SignupDetails = () => {
  const [checked, setChecked] = useState(false);
  const { userData } = useContext(ProfileContext)
  const [selectedCode, setSelectedCode] = useState('91');
  const [screen, setScreen] = useState("name");
  const navigate = useNavigate()

  const fields = [
    {
      id: "firstName",
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "First Name",
      required: true,
    },
    {
      id: "lastName",
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
      required: true,
    },
    {
      id: "recordLabel",
      name: "company_label",
      label: "Company/Record label",
      type: "text",
      placeholder: "Example: ForeVision Digital",
      required: false,
    },
    {
      id: "address",
      name: "billing_address",
      label: "Address",
      type: "text",
      placeholder: "Enter Here",
      required: true,
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      // placeholder: "abc@example.com",
      value: userData?.user_email,
      disabled: true,
      required: true,
    },
    {
      id: "city",
      name: "billing_city",
      label: "City",
      type: "text",
      placeholder: "City Name",
      required: true,
    },
    {
      id: "country",
      name: "billing_country",
      label: "Country",
      type: "text",
      placeholder: "India",
      required: true,
    },
    {
      id: "postalCode",
      name: "postal_code",
      label: "Postal Code",
      type: "number",
      placeholder: "700001",
      required: true,
    },
    // {
    //   id: "save",
    //   type: "checkbox",
    //   label: "Save this information for next time",
    // },
    {
      id: "phone",
      name: "phone_no",
      label: "Phone",
      type: "tel",
      placeholder: "+91",
      required: true,
      // pattern: /^((\+91)?|91|91\s|\+91\s)?[789][0-9]{9}/g,
    },
  ];

  /* ===========================   GAP FOR DOUBLE INPUT FIELD   ================================ */
  useEffect(() => {
    const newArr = [];
    document.getElementById("form").childNodes.forEach((el) => {
      // console.log(el.classList.value.includes("w-1/2"));
      el.classList.value.includes("w-1/2") && newArr.push(el);
    });
    // console.log(newArr);

    newArr
      .slice(0, 5)
      .map((i, key) => key % 2 === 0 && i.classList.add("pr-2"));
  }, []);

  const [signupDetailsData, setSignupDetailsData] = useState({})
  const signup = (e) => {
    e.preventDefault();
    // console.log(userData.Id);
    const userDetailsData = { ...signupDetailsData, phone_no: selectedCode + signupDetailsData.phone_no, user_email: userData?.user_email };
    console.log(userData);



    // const formData = new FormData();
    // // console.log(signupDetailsData);
    // for (const key in signupDetailsData) {
    //   formData.append(key, signupDetailsData[key])
    // }

    // // for (const value of formData.values()) {
    // //   console.log(value);
    // // }
    // formData.append("user_id", userData.ID);
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },


    // }



    // console.log(userDetailsData);
    // // const phoneValidity = /^((\+91)?|91|91\s|\+91\s)?[789][0-9]{9}/g;
    axios.post(backendUrl + "post-user-details", userDetailsData).then(res => {

      if (res.data.acknowledged) {
        // console.log(res.data);

        navigate("/");
        window.location.reload()
      }
    }).catch(err => console.log(err))

    // console.log(userDetailsData);

    // console.log(phoneValidity.test(e.target.phone.value));
  };

  return (
    <>
      <AuthBody
        heading="We need a few more details"
        onSubmit={signup}
        id="signup-page"
        className="hidden xl:flex"
      >
        <div className="flex flex-wrap" id="form">
          {fields.map((props, id) =>
            (id + 1) % 3 === 0 ? (
              <>
                {props.name === "phone" && (
                  <div className="flex w-fit gap-[8px] items-center mt-3 -mb-3">
                    <input
                      type="checkbox"
                      required={true}
                      id={id}
                      className="hidden"
                      onChange={(e) => setChecked(e.target.checked)}
                    />

                    <div
                      className={`${!checked &&
                        "border-[1px]  border-surface-white-line text-[12px]"
                        } rounded-[4px] w-[16px] h-[16px]`}
                    >
                      {checked && <img src={check} alt="checkbox" />}
                    </div>

                    <label
                      htmlFor={id}
                      className="text-black-primary text-subtitle-2 font-medium"
                    >
                      Save this information for next time
                    </label>
                  </div>
                )}
                <InputField
                  {...fields[id]}
                  selectedCode={selectedCode}
                  setSelectedCode={setSelectedCode}
                  onChange={e => signupDetailsData[props.name] = e.target.value}
                  key={id}
                  containerId={id}
                  containerClassName={`mt-3 w-full`}
                />
              </>
            ) : (
              <InputField
                {...props}
                containerId={id}
                onChange={e => signupDetailsData[props.name] = e.target.value}
                key={id}
                containerClassName={`mt-3 w-1/2`}
              // fieldClassName="mr-2"
              />
            )
          )}
        </div>
        {/* <InputField {...fields[2]} containerClassName={`mt-3 w-full`} /> */}
        <div className="mt-3 mb-2 text-center">
          <Button
            type="submit"
            text="Submit"
            onClick={() => setScreen("contact")}
          // disabled={
          //   !(email.length > 0 && password.length && password === confirmPass)
          // }
          />
        </div>
      </AuthBody>


      {/* ========== Phone View ========== */}
      {/* <ReactOwlCarousel items={1} mouseDrag={false} touchDrag={false} id="signup-details-slider"> */}
      <AuthBody
        heading="We need a few more details"
        onSubmit={(e) => {
          e.preventDefault();
          setScreen("contact");
        }}
        id="signup-page"
        className={`xl:hidden ${screen === "name" ? "flex" : "hidden"}`}
      >
        <div className="flex flex-wrap" id="form">
          {fields.slice(0, 3).map((props, id) =>
          (
            <InputField
              {...props}
              containerId={id}
              key={id}
              onChange={e => setSignupDetailsData({ ...signupDetailsData, [props.name]: e.target.value })}
              containerClassName={`mt-3 w-full`}
            // fieldClassName="mr-2"
            />
          )
          )}"


        </div>
        {/* <InputField {...fields[2]} containerClassName={`mt-3 w-full`} /> */}
        <div className="mt-3 mb-2 text-center">
          <Button
            type="submit"
            text="SignUp"
            onClick={(e) => {
              e.preventDefault();
              setScreen("contact");
            }}
          />
        </div>
      </AuthBody>

      <AuthBody
        heading="We need a few more details"
        onSubmit={(e) => {
          e.preventDefault();
          setScreen("small-address");
        }}
        id="signup-page"
        className={`xl:hidden ${screen === "contact" ? "flex" : "hidden"}`}
      >
        <div className="flex flex-wrap" id="form">
          {/* Email */}
          <InputField
            {...fields[4]}
            containerId={fields[4].id}
            key={fields[4].id}
            onChange={e => setSignupDetailsData({ ...signupDetailsData, [fields[4].name]: e.target.value })}
            containerClassName={`mt-3 w-full`}
          // fieldClassName="mr-2"
          />
          {/* phone number */}
          <InputField
            {...fields[8]}
            containerId={fields[8].id}
            key={fields[8].id}
            onChange={e => setSignupDetailsData({ ...signupDetailsData, [fields[8].name]: e.target.value })}
            containerClassName={`mt-3 w-full`}
            selectedCode={selectedCode}
            setSelectedCode={setSelectedCode}
          />


        </div>
        {/* <InputField {...fields[2]} containerClassName={`mt-3 w-full`} /> */}
        <div className="mt-3 mb-2 text-center flex justify-center">
          <Button
            rightIcon={true}
          />
        </div>
      </AuthBody>

      <AuthBody
        heading="We need a few more details"
        onSubmit={(e) => {
          e.preventDefault();
          setScreen("large-address");
        }}
        id="signup-page"
        className={`xl:hidden ${screen === "small-address" ? "flex" : "hidden"}`}
      >
        <div className="flex flex-wrap" id="form">
          {/* {fields.slice(9, 10).map((props, id) => */}

          <InputField
            {...fields[3]}
            containerId={fields[3].id}
            key={fields[3].id}
            onChange={e => setSignupDetailsData({ ...signupDetailsData, [fields[3].name]: e.target.value })}
            containerClassName={`mt-3 w-full`}
          />
          <InputField
            {...fields[5]}
            containerId={fields[5].id}
            key={fields[5].id}
            onChange={e => setSignupDetailsData({ ...signupDetailsData, [fields[5].name]: e.target.value })}
            containerClassName={`mt-3 w-full`}
          />


        </div>

        <div className="mt-3 mb-2 text-center">
          <Button
            type="submit"
            text="Submit"
            onClick={(e) => {
              e.preventDefault()
              setScreen("large-address")
            }}
          />
        </div>
      </AuthBody>

      <AuthBody
        heading="We need a few more details"
        onSubmit={signup}
        id="signup-page"
        className={`xl:hidden ${screen === "large-address" ? "flex" : "hidden"}`}
      >
        <div className="flex flex-wrap" id="form">
          <InputField
            {...fields[6]}
            containerId={fields[6].id}
            key={fields[6].id}
            onChange={e => signupDetailsData[fields[6].name] = e.target.value}
            containerClassName={`mt-3 w-full`}
          // fieldClassName="mr-2"
          />
          <InputField
            {...fields[7]}
            containerId={fields[7].id}
            key={fields[7].id}
            onChange={e => signupDetailsData[fields[7].name] = e.target.value}
            containerClassName={`mt-3 w-full`}
          // fieldClassName="mr-2"
          />


        </div>

        <div className="mt-3 mb-2 text-center">
          <Button
            type="submit"
            text="Submit"
          />
        </div>
      </AuthBody>
      {/* </ReactOwlCarousel> */}



    </>
  );
};

export default SignupDetails;
