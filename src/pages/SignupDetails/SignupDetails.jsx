import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import check from "./../../assets/icons/checkbox.webp";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { toast } from "react-toastify";

const SignupDetails = () => {
  const [checked, setChecked] = useState(false);
  const { userData, profileData } = useContext(ProfileContext)
  // console.log(userData);
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
      placeholder: "Example: Forevision Digital",
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
      id: "alternateEmail",
      name: "alternateEmail",
      label: "Alternate Email",
      type: "email",
      placeholder: "abc@example.com",
      value: userData.user_email,
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
      type: "text",
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

  const signup = (e) => {
    e.preventDefault();
    console.log(userData.Id);

    const formData = new FormData(e.target);

    formData.append("user_id", userData.ID);
    const config = {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    }

    // const phoneValidity = /^((\+91)?|91|91\s|\+91\s)?[789][0-9]{9}/g;
    axios.post("https://adztronaut.com/music/admin/api/updateUserOtherInfo", formData, {
      headers: {
        Authorization: `Bearer ${profileData.user_token}`,
      },
    }).then(res => {
      if (res.data.success) {
        toast.success("Details are added successfully", {
          position: 'bottom-center'
        })
      }
    })

    // console.log(phoneValidity.test(e.target.phone.value));
  };

  return (
    <AuthBody
      heading="Sign Up"
      altDescription="Already Have an Account?"
      altText="Log in"
      altLink="/login"
      onSubmit={signup}
      id="signup-page"
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
                key={id}
                containerId={id}
                containerClassName={`mt-3 w-full`}
              />
            </>
          ) : (
            <InputField
              {...props}
              containerId={id}
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
          text="Sign Up"
        // disabled={
        //   !(email.length > 0 && password.length && password === confirmPass)
        // }
        />
      </div>
    </AuthBody>
  );
};

export default SignupDetails;
