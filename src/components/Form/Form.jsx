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
    // console.log(fields);

    const { profileData } = useContext(ProfileContext);

    const formData = useMemo(() => {
      return {};
    }, []);

    const formRef = useRef(null);

    useEffect(() => {
      // Combine phone number and selected code
      setFullPhoneNumber(`${selectedCode}${phoneNumber}`);
    }, [selectedCode, phoneNumber]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Prepare the form data
      const dataToSubmit = { ...formData, phone: fullPhoneNumber };
      console.log(dataToSubmit);

      // try {
      //   const response = await axios.post(
      //     "https://api.forevisiondigital.in/submit-form",
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
      const { name, value } = e.target;

      // Update formData dynamically
      formData[name] = value;

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
