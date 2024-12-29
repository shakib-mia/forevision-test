import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import SelectOptions from "../SelectOptions/SelectOptions";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { toast } from "react-toastify";
import { data } from "jquery";
import { useLocation } from "react-router-dom";

const Form = forwardRef(
  (
    {
      fields,
      instruction,
      uIdKey,
      submitFromParent,
      id,
      containerClassName,
      headingSize,
      heading,
    },
    ref
  ) => {
    // console.log(fields.find((item) => item.type === "file"));
    const [disabled, setDisabled] = useState(true);
    const [selectedCode, setSelectedCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullPhoneNumber, setFullPhoneNumber] = useState("");
    const location = useLocation();
    // console.log(fields);

    const { profileData } = useContext(ProfileContext);

    const [formData, setFormData] = useState({});

    const formRef = useRef(null);

    // useEffect(() => {
    //   // Combine phone number and selected code
    //   setFullPhoneNumber(`${selectedCode}${phoneNumber}`);
    // }, [selectedCode, phoneNumber]);
    console.log(formData);

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Prepare the form data
      const dataToSubmit = {
        ...formData,
        [`${location.pathname
          .split("/")[1]
          .replace(/-/g, "_")}_phone_ext`]: `${selectedCode}${fullPhoneNumber}`,
      };
      dataToSubmit.id = id;
      // console.log(dataToSubmit);

      try {
        const response = await axios.post(
          "http://localhost:5100/submit-form",
          dataToSubmit,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${profileData.user_token}`,
            },
          }
        );

        if (response.data.insertedId.length) {
          toast.success("Form submitted successfully!");
          e.target.reset();
        } else {
          throw new Error(response.data.message || "Submission failed");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(`Error: ${error.message || "Unexpected error occurred"}`);
      }
    };

    const handleChange = (e) => {
      const { name, value, checked, placeholder, options } = e.target;
      // Update formData dynamically
      console.log(name);

      if (name.split("-")[0] === "isrc") {
        if (
          !formData[
            `${location.pathname.split("/")[1].replace(/-/g, "_")}_isrc`
          ]
        ) {
          // console.log();
          formData[
            `${location.pathname.split("/")[1].replace(/-/g, "_")}_isrc`
          ] = ""; // Initialize as an empty string if undefined
        }

        if (e.target.checked) {
          formData[
            `${location.pathname.split("/")[1].replace(/-/g, "_")}_isrc`
          ] = formData[
            `${location.pathname.split("/")[1].replace(/-/g, "_")}_isrc`
          ]
            ? formData[
                `${location.pathname.split("/")[1].replace(/-/g, "_")}_isrc`
              ] +
              "," +
              name.split("-")[1]
            : name.split("-")[1];
        }
      } else {
        formData[name] = value;
      }

      setFormData({ ...formData });

      // Check if all required fields are filled
      const isValid = fields
        .filter((field) => field.required)
        .every((field) => {
          const fieldValue = formData[field.name];
          return (
            fieldValue &&
            (Array.isArray(fieldValue)
              ? fieldValue.length > 0
              : fieldValue.trim() !== "")
          );
        });

      setDisabled(!isValid);
    };

    return (
      <>
        <form
          onSubmit={submitFromParent || handleSubmit}
          onChange={handleChange}
          id={id || "myForm"}
          ref={ref || formRef}
          autoComplete="off"
          className={`mt-[90px] rounded-[15px] shadow-lg pt-[29px] px-[50px] 2xl:px-[60px] 3xl:px-[101px] pb-[80px] bg-white-secondary w-7/12 mx-auto ${containerClassName}`}
        >
          {heading && (
            <h3
              className={`${headingSize ? headingSize : "text-heading-4-bold"}`}
            >
              {heading}
            </h3>
          )}
          {fields.map((props, key) =>
            props.type === "dropdown" ? (
              <div className="mt-[32px]">
                <SelectOptions
                  {...props}
                  key={props.name}
                  onChange={(e) => setSelectedCode(e.target.value)} // Update selected code
                />
              </div>
            ) : props.type === "file" ? (
              <InputField
                {...props}
                key={key}
                id={`input${key}`}
                containerClassName="mt-[23px] input"
              />
            ) : (
              <InputField
                {...props}
                key={key}
                id={`input${key}`}
                selectedCode={selectedCode}
                setSelectedCode={setSelectedCode}
                containerClassName="mt-[23px] input"
                onChange={handleChange} // Update phone number or other fields
              />
            )
          )}

          <div className="mt-6">{instruction}</div>

          <div className="w-fit mx-auto mt-[70px]">
            <Button type="submit" text="Submit" />
          </div>
        </form>
      </>
    );
  }
);

export default Form;
