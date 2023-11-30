import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import check from "./../../assets/icons/checkbox.webp";
import { ProfileContext } from "../../contexts/ProfileContext";
// import { imageDomain } from "../../constants";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
// import axios from "axios";
// import { toast } from "react-toastify";

const EditProfile = ({ handleClose }) => {
    const [checked, setChecked] = useState(false);
    const { profileData } = useContext(ProfileContext)
    const [formData, setFormData] = useState(profileData);
    // console.log(profileData);
    const fields = [
        {
            id: "firstName",
            name: "first_name",
            label: "First Name",
            type: "text",
            placeholder: "First Name",
            required: true,
            value: formData.first_name,
            onChange: e => setFormData({ first_name: e.target.value })
        },
        {
            id: "lastName",
            name: "last_name",
            label: "Last Name",
            type: "text",
            placeholder: "Last Name",
            required: true,
            value: formData.last_name,
            onChange: e => setFormData({ last_name: e.target.value })
        },
        {
            id: "recordLabel",
            name: "company_label",
            label: "Company/Record label",
            type: "text",
            placeholder: "Example: ForeVision Digital",
            required: false,
            value: formData.company_label,
            onChange: e => setFormData({ company_label: e.target.value })
        },
        {
            id: "address",
            name: "billing_address",
            label: "Address",
            type: "text",
            placeholder: "Enter Here",
            required: true,
            value: formData.billing_address,
            onChange: e => setFormData({ billing_address: e.target.value })
        },
        {
            id: "alternateEmail",
            name: "alternateEmail",
            label: "Alternate Email",
            type: "email",
            placeholder: "abc@example.com",
            value: profileData.user_email,
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
            value: formData.billing_city,
            onChange: e => setFormData({ billing_city: e.target.value })
        },
        {
            id: "country",
            name: "billing_country",
            label: "Country",
            type: "text",
            placeholder: "India",
            required: true,
            value: formData.billing_country,
            onChange: e => setFormData({ billing_country: e.target.value })
        },
        {
            id: "postalCode",
            name: "postal_code",
            label: "Postal Code",
            type: "number",
            placeholder: "700001",
            required: true,
            value: formData.postal_code,
            onChange: e => setFormData({ postal_code: e.target.value })
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
            value: formData.phone_no,
            onChange: e => setFormData({ phone_no: e.target.value })
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

    const edit = (e) => {
        e.preventDefault();
        // console.log(profileData.Id);

        // const formData = new FormData(e.target);
        // console.log(Object.entries(formData));
        // console.log(phoneValidity.test(e.target.phone.value));
    };



    return (
        <AuthBody
            heading="Edit Profile"
            // altDescription="Already Have an Account?"
            // altText="Log in"
            // altLink="/login"
            onSubmit={edit}
            className="backdrop-blur fixed top-0 left-0 z-[9999]"
            id="edit-profile"
            closeIcon={true}
            // handleClose={handleClose}
            whiteContainerClass="h-3/4 overflow-y-auto overflow-x-hidden relative"
        >
            <button className="absolute top-1 right-1 text-heading-5 flex items-center justify-center w-3 h-3 rounded-full hover:bg-grey hover:text-white" onClick={handleClose}>
                &times;
            </button>
            <ProfilePicture imageUrl={profileData.display_image} editable={true} />

            <div className="flex flex-wrap px-3" id="form">
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
            {/* </div> */}
            {/* <InputField {...fields[2]} containerClassName={`mt-3 w-full`} /> */}
            <div className="mt-3 mb-2 text-center">
                <Button
                    type="submit"
                    text="Submit"
                // disabled={
                //   !(email.length > 0 && password.length && password === confirmPass)
                // }
                />
            </div>
        </AuthBody>
    );
};

export default EditProfile;