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

    const { profileData, userData } = useContext(ProfileContext);

    const [formData, setFormData] = useState({});

    const formRef = useRef(null);

    // useEffect(() => {
    //   // Combine phone number and selected code
    //   setFullPhoneNumber(`${selectedCode}${phoneNumber}`);
    // }, [selectedCode, phoneNumber]);

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
      console.log(dataToSubmit);

      // try {
      //   const response = await axios.post(
      //     "http://localhost:5100/submit-form",
      //     dataToSubmit,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${profileData.user_token}`,
      //       },
      //     }
      //   );

      //   if (response.data.insertedId.length) {
      //     toast.success("Form submitted successfully!");
      //     e.target.reset();
      //   } else {
      //     throw new Error(response.data.message || "Submission failed");
      //   }
      // } catch (error) {
      //   console.error("Error submitting form:", error);
      //   toast.error(`Error: ${error.message || "Unexpected error occurred"}`);
      // }
    };

    const handleChange = (e) => {
      const { name, value, checked, type } = e.target;

      const newFormData = { ...formData };

      if (name.split("-")[0] === "isrc") {
        const isrcKey = `${location.pathname
          .split("/")[1]
          .replace(/-/g, "_")}_isrc`;
        newFormData[isrcKey] = newFormData[isrcKey] || "";

        if (checked) {
          newFormData[isrcKey] = newFormData[isrcKey]
            ? `${newFormData[isrcKey]},${name.split("-")[1]}`
            : name.split("-")[1];
        }
      } else if (type === "checkbox") {
        newFormData[name] = Array.isArray(newFormData[name])
          ? [...newFormData[name]]
          : [];

        if (checked) {
          newFormData[name].push(
            e.target.id.split("_")[e.target.id.split("_").length - 1]
          );
        } else {
          newFormData[name] = newFormData[name].filter(
            (item) =>
              item !== e.target.id.split("_")[e.target.id.split("_").length - 1]
          );
        }

        setFormData(newFormData);
      } else {
        newFormData[name] = value;
      }

      setFormData(newFormData);

      const isValid = fields
        .filter((field) => field.required)
        .every((field) => {
          const fieldValue = newFormData[field.name];
          return (
            fieldValue &&
            (Array.isArray(fieldValue)
              ? fieldValue.length > 0
              : fieldValue.trim() !== "")
          );
        });

      setDisabled(!isValid);
    };

    useEffect(() => {
      // Capture autofilled values when the form loads or fields update
      const autofilledData = {};
      fields.forEach((field) => {
        const inputElement = document.getElementsByName(field.name)[0];
        if (inputElement) {
          autofilledData[field.name] = inputElement.value || "";
        }
      });

      // Update formData with autofilled values
      setFormData((prev) => ({ ...prev, ...autofilledData }));

      // Check if all required fields are filled for validation
      const isValid = fields
        .filter((field) => field.required)
        .every((field) => {
          const fieldValue = autofilledData[field.name] || formData[field.name];
          return (
            fieldValue &&
            (Array.isArray(fieldValue)
              ? fieldValue.length > 0
              : fieldValue.trim() !== "")
          );
        });

      // setDisabled(!isValid);
    }, [fields]);

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
