import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { compareTwoObjects } from "../../utils/compareTwoObjects";

const Settings = () => {
  const { token, userData } = useContext(ProfileContext);
  const [formData, setFormData] = useState(userData);
  //   console.log(formData);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   useEffect(
  //     () => console.log(deepEqual(formData, userData)),
  //     [formData.first_name]
  //   );

  console.log(formData);

  return (
    <div className="pb-6 lg:pb-0 lg:h-screen w-screen flex pt-5 lg:pt-0 lg:items-center justify-center">
      <div
        className={`w-11/12 xl:w-1/3 shadow-md xl:shadow-xl p-3 rounded-[22px] bg-white relative h-fit`}
      >
        <div className="flex flex-wrap gap-y-2">
          <InputField
            value={formData.first_name}
            label={"First Name"}
            hideRequired={true}
            containerClassName={"w-full lg:w-1/2 lg:pr-1"}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          <InputField
            value={formData.last_name}
            label={"First Name"}
            hideRequired={true}
            containerClassName={"w-full lg:w-1/2 lg:pl-1"}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />

          <InputField
            value={formData.user_email}
            label={"Email Address"}
            containerClassName={"w-full"}
            disabled={true}
            hideRequired={true}
          />

          <InputField
            value={formData.billing_address}
            label={"Billing Address"}
            containerClassName={"w-full lg:w-1/2 lg:pr-1"}
            onChange={(e) =>
              setFormData({ ...formData, billing_address: e.target.value })
            }
            // disabled={true}
            hideRequired={true}
          />

          <InputField
            value={formData.billing_city}
            label={"Billing city"}
            containerClassName={"w-full lg:w-1/2 lg:pl-1"}
            onChange={(e) =>
              setFormData({ ...formData, billing_city: e.target.value })
            }
            // disabled={true}
            hideRequired={true}
          />

          <InputField
            value={formData.postal_code}
            label={"Postal Code"}
            containerClassName={"w-full"}
            onChange={(e) =>
              setFormData({ ...formData, postal_code: e.target.value })
            }
            hideRequired={true}
          />

          <InputField
            value={formData.partner_name}
            label={"Partner Name"}
            containerClassName={"w-full lg:w-1/2 lg:pr-1"}
            onChange={(e) =>
              setFormData({ ...formData, partner_name: e.target.value })
            }
            // disabled={true}
            hideRequired={true}
          />

          <InputField
            value={formData.phone_no}
            label={"Phone No."}
            containerClassName={"w-full lg:w-1/2 lg:pl-1"}
            onChange={(e) =>
              setFormData({ ...formData, phone_no: e.target.value })
            }
            // disabled={true}
            hideRequired={true}
          />

          {/* <InputField
            value={formData.postal_code}
            label={"Postal Code"}
            containerClassName={"w-full"}
            onChange={(e) =>
              setFormData({ ...formData, postal_code: e.target.value })
            }
            hideRequired={true}
          /> */}
        </div>

        <h5 className="mt-3 text-heading-5-bold text-grey-dark text-center">
          Change Password
        </h5>

        <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 mt-2">
          <InputField
            // value={formData.partner_name}
            label={"Password"}
            containerClassName={"w-full lg:w-1/2 lg:pr-1"}
            type={"password"}
            placeholder={"Enter Password"}
            onChange={(e) => setPassword(e.target.value)}
            // disabled={true}
            hideRequired={true}
          />

          <InputField
            // value={formData.phone_no}
            label={"Confirm Password"}
            containerClassName={"w-full lg:w-1/2 lg:pl-1"}
            type={"password"}
            placeholder={"Confirm Password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // disabled={true}
            hideRequired={true}
          />
        </div>

        <div className="flex justify-center mt-2">
          <Button
            disabled={
              !(
                password === confirmPassword &&
                password.length < 6 &&
                compareTwoObjects(formData, userData)
              )
            }
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
