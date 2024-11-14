import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import check from "./../../assets/icons/checkbox.webp";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendUrl, user } from "../../constants";

const SignupDetails = () => {
  const [checked, setChecked] = useState(false);
  const { userData, profileData, setUserData, token } =
    useContext(ProfileContext);
  const [selectedCode, setSelectedCode] = useState("91");
  const [screen, setScreen] = useState("name");
  const navigate = useNavigate();
  const [userIds, setUserIds] = useState([]);
  const [signupDetailsData, setSignupDetailsData] = useState(userData);
  const [originalData] = useState(userData); // Store the initial user data for comparison

  useEffect(() => {
    axios
      .get(backendUrl + "generate-user-id")
      .then(({ data }) => setUserIds(data));
  }, []);

  const checkForChanges = (updatedFormData) => {
    const isDataChanged = Object.keys(updatedFormData).some(
      (key) => updatedFormData[key] !== originalData[key]
    );
    setIsChanged(isDataChanged);
  };

  useEffect(() => {
    axios
      .get(backendUrl + "generate-user-id")
      .then(({ data }) => setUserIds(data));
  }, []);

  const [userId, setUserId] = useState("");
  const [available, setAvailable] = useState(true); // Assuming it's true initially
  const [hideNote, setHideNote] = useState(false);
  const [isChanged, setIsChanged] = useState(false); // To track changes in the form

  // Check if all required fields are filled
  const areFieldsFilled = () => {
    return (
      userData.first_name &&
      userData.last_name &&
      userData.billing_address &&
      userData.billing_city &&
      userData.billing_country &&
      userData.postal_code &&
      userData.phone_no &&
      userId // Assuming user ID is also required
    );
  };

  // Update form validity based on required fields and availability
  useEffect(() => {
    setIsChanged(areFieldsFilled());
  }, [userData, userId]);

  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
    setUserData({ ...userData, "user-id": value });

    // console.log(userIds.includes(value));

    // Check user ID availability
    if (userIds.includes(value)) {
      setAvailable(false); // User ID already in use
      setHideNote(false);
    } else {
      setAvailable(true); // User ID is available
      setHideNote(true);
    }
  };

  const fields = [
    {
      id: "firstName",
      hideRequired: true,
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "First Name",
      value: userData.first_name,
      onChange: (e) => setUserData({ ...userData, first_name: e.target.value }),
      required: true,
    },
    {
      id: "lastName",
      hideRequired: true,
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
      value: userData.last_name,
      onChange: (e) => setUserData({ ...userData, last_name: e.target.value }),
      required: true,
    },
    {
      id: "recordLabel",
      hideRequired: true,
      name: "company_label",
      label: "Company/Record label",
      type: "text",
      placeholder: "Example: ForeVision Digital",
      onChange: (e) =>
        setUserData({ ...userData, recordLabel: e.target.value }),
      required: false,
    },
    {
      id: "address",
      hideRequired: true,
      name: "billing_address",
      label: "Address",
      type: "text",
      placeholder: "Enter Here",
      value: userData.billing_address,
      onChange: (e) =>
        setUserData({ ...userData, billing_address: e.target.value }),
      required: true,
    },
    {
      id: "email",
      hideRequired: true,
      name: "email",
      label: "Email",
      type: "email",
      value: userData.user_email,
      onChange: (e) => {
        console.log(e.target.value);
        setUserData({ ...userData, user_email: e.target.value });
      },
      disabled: true,
      required: false,
    },
    {
      id: "city",
      hideRequired: true,
      name: "billing_city",
      label: "City",
      type: "text",
      placeholder: "City Name",
      value: userData.billing_city,
      onChange: (e) =>
        setUserData({ ...userData, billing_city: e.target.value }),
      required: true,
    },
    {
      id: "country",
      hideRequired: true,
      name: "billing_country",
      label: "Country",
      type: "text",
      placeholder: "India",
      value: userData.billing_country,
      onChange: (e) =>
        setUserData({ ...userData, billing_country: e.target.value }),
      required: true,
    },
    {
      id: "postalCode",
      hideRequired: true,
      name: "postal_code",
      label: "Postal Code",
      type: "number",
      placeholder: "700001",
      value: userData.postal_code,
      onChange: (e) =>
        setUserData({ ...userData, postal_code: e.target.value }),
      required: true,
    },
    {
      id: "phone",
      hideRequired: true,
      name: "phone_no",
      label: "Phone",
      type: "tel",
      placeholder: "+91",
      value: userData.phone_no,
      onChange: (e) => setUserData({ ...userData, phone_no: e.target.value }),
      required: true,
    },
    {
      id: "gst",
      name: "gst_no",
      label: "Gst",
      type: "text",
      value: userData.gst_no,
      onChange: (e) => setUserData({ ...userData, gst_no: e.target.value }),
      hideRequired: false,
    },
    {
      id: "userId",
      name: "user-id",
      label: "User ID",
      type: "text",
      placeholder: "abc123",
      value: userId,
      onChange: handleUserIdChange,
      required: true,
      note: hideNote || (available ? "Available" : "Already in Use"),
      dangerNote: !available,
      successNote: available,
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
      .slice(0, 7)
      .map((i, key) => key % 2 === 0 && i.classList.add("pr-2"));
  }, []);

  const signup = (e) => {
    e.preventDefault();
    // console.log(userData);
    const userDetailsData = {
      ...userData,
      phone_no: selectedCode + userData.phone_no,
      // user_email: userData.user_email,
    };

    const config = {
      headers: {
        token,
      },
    };

    axios
      .post(backendUrl + "post-user-details", userDetailsData, config)
      .then((res) => {
        if (res.data.acknowledged) {
          // console.log(res.data);

          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));

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
                      onChange={(e) => {
                        if (!props.onChange) {
                          setUserData({
                            ...userData,
                            [props.name]: e.target.value,
                          });
                        } else {
                          props.onChange(e);
                        }
                      }}
                    />

                    <div
                      className={`${
                        !checked &&
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
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (!props.onChange) {
                      setUserData({
                        ...userData,
                        [props.name]: e.target.value,
                      });
                    } else {
                      props.onChange(e);
                    }
                  }}
                  key={id}
                  containerId={id}
                  containerClassName={`mt-3 w-full`}
                />
              </>
            ) : (
              <InputField
                {...props}
                containerId={id}
                onChange={(e) => {
                  if (!props.onChange) {
                    setUserData({
                      ...userData,
                      [props.name]: e.target.value,
                    });
                  } else {
                    props.onChange(e);
                  }
                }}
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
          {fields.slice(0, 3).map((props, id) => (
            <InputField
              {...props}
              containerId={id}
              key={id}
              onChange={(e) => {
                if (!props.onChange) {
                  setUserData({
                    ...userData,
                    [props.name]: e.target.value,
                  });
                } else {
                  props.onChange(e);
                }
              }}
              containerClassName={`mt-3 w-full`}
            />
          ))}
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
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[4].name]: e.target.value,
              });

              // signupDetailsData;
            }}
            containerClassName={`mt-3 w-full`}
            // fieldClassName="mr-2"
          />
          {/* phone number */}
          <InputField
            {...fields[8]}
            containerId={fields[8].id}
            key={fields[8].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[8].name]: e.target.value,
              });

              // signupDetailsData;
            }}
            containerClassName={`mt-3 w-full`}
            selectedCode={selectedCode}
            setSelectedCode={setSelectedCode}
          />
        </div>
        {/* <InputField {...fields[2]} containerClassName={`mt-3 w-full`} /> */}
        <div className="mt-3 mb-2 text-center flex justify-center">
          <Button rightIcon={true} />
        </div>
      </AuthBody>

      <AuthBody
        heading="We need a few more details"
        onSubmit={(e) => {
          e.preventDefault();
          setScreen("large-address");
        }}
        id="signup-page"
        className={`xl:hidden ${
          screen === "small-address" ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-wrap" id="form">
          {/* {fields.slice(9, 10).map((props, id) => */}

          <InputField
            {...fields[3]}
            containerId={fields[3].id}
            key={fields[3].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[3].name]: e.target.value,
              });

              // signupDetailsData;
            }}
            containerClassName={`mt-3 w-full`}
          />
          <InputField
            {...fields[5]}
            containerId={fields[5].id}
            key={fields[5].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[5].name]: e.target.value,
              });
              // signupDetailsData;
            }}
            containerClassName={`mt-3 w-full`}
          />
        </div>

        <div className="mt-3 mb-2 text-center">
          <Button
            type="submit"
            text="Submit"
            onClick={(e) => {
              e.preventDefault();
              setScreen("large-address");
            }}
          />
        </div>
      </AuthBody>

      <AuthBody
        heading="We need a few more details"
        onSubmit={signup}
        id="signup-page"
        className={`xl:hidden ${
          screen === "large-address" ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-wrap" id="form">
          <InputField
            {...fields[6]}
            containerId={fields[6].id}
            key={fields[6].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[6].name]: e.target.value,
              });
              // signupDetailsData;
            }}
            containerClassName={`mt-3 w-full`}
            // fieldClassName="mr-2"
          />
          <InputField
            {...fields[7]}
            containerId={fields[7].id}
            key={fields[7].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[7].name]: e.target.value,
              });
              // signupDetailsData;
            }}
            containerClassName={`mt-3 w-full`}
            // fieldClassName="mr-2"
          />
        </div>

        <div className="mt-3 mb-2 text-center">
          <Button
            type="submit"
            text="Submit"
            disabled={!available || !isChanged}
          />
        </div>
      </AuthBody>
      {/* </ReactOwlCarousel> */}
    </>
  );
};

export default SignupDetails;
