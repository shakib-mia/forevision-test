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
import axios from "axios";
import { toast } from "react-toastify";
import Chat from "../Chat/Chat";
// import { config } from "../../constants";
import SelectOptions from "../SelectOptions/SelectOptions";
import { ProfileContext } from "../../contexts/ProfileContext";

const Form = forwardRef(
  (
    {
      fields,
      instruction,
      backendUrl,
      uIdKey,
      submitFromParent,
      id,
      containerClassName,
      headingSize,
      heading,
    },
    ref
  ) => {
    const [disabled, setDisabled] = useState(true);
    const toastId = React.useRef(null);

    const { profileData } = useContext(ProfileContext);

    const formData = useMemo(() => {
      return {};
    }, []);

    const formRef = useRef(null);

    useEffect(() => {
      setTimeout(() => {
        const inputFields = document.getElementsByClassName("input-field");
        for (const inputField of inputFields) {
          formData[inputField.name] = "";
        }
      }, 0);
    }, [formData]);

    const user = JSON.parse(sessionStorage.getItem("user"));

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = {};

      for (const field of fields) {
        if (Object.keys(field).includes("selectItems")) {
          const selected = field.selectItems
            .filter((item) => item.selected)
            .map((item) => item.text);
          formData[field.name] = selected.join(", ");
        } else if (e.target[field.name]?.type !== "file") {
          formData[field.name] = e.target[field.name]?.value;
        } else {
          // For file inputs, we can't send the file directly in JSON
          // You might need to handle file uploads separately
          formData[field.name] = e.target[field.name].files[0]?.name || "";
        }
      }

      if (id === "video-distribution") {
        const selectItems = fields[5].selectItems.filter(
          (item) => item.selected === true
        );
        const selectedItems = selectItems.map((item) => item.text);
        formData["video_distribution_content_type"] = selectedItems.join(", ");
      }

      formData.id = id; // Include the form id

      toastId.current = toast("Loading...", {
        autoClose: false,
        position: "bottom-right",
      });

      console.log("Sending data:", formData);

      try {
        const response = await axios.post(
          backendUrl + "submit-form",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${profileData.user_token}`,
            },
          }
        );

        if (response.data.insertedId.length) {
          toast.update(toastId.current, {
            type: toast.TYPE.SUCCESS,
            render: "Success",
            position: "bottom-right",
            autoClose: 5000,
          });
        } else {
          throw new Error(response.data.message || "Submission failed");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.update(toastId.current, {
          type: toast.TYPE.ERROR,
          render: `Error: ${error.message || "An unexpected error occurred"}`,
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      formData[name] = value;

      // console.log(name);
      //  if (e.target.checked) {
      //    console.log(e.target.name);
      //  }

      for (const field of fields) {
        if (field.disabled) {
          formData[field.name] = field.value;
        }

        // console.log(field);
        if (field.type === "multi-select") {
          const selected = field.selectItems.filter(
            (item) => item.selected === true
          );
          const concatenatedText = selected
            .map(function (obj) {
              return obj.text;
            })
            .join(", ");
          formData[field.name] = concatenatedText;

          // console.log(formData);
        }
      }

      const entries = Object.values(formData).every(
        (value) => value.length > 0
      );
      // console.log(Object.values(formData));
      setDisabled(!entries);
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
                <SelectOptions {...props} key={props} />
              </div>
            ) : (
              <InputField
                {...props}
                key={key}
                id={`input${key}`}
                containerClassName="mt-[23px] input"
              />
            )
          )}

          <div className="mt-6">{instruction}</div>

          <div className="w-fit mx-auto mt-[70px]">
            <Button type="submit" text="submit" disabled={disabled} />
          </div>
        </form>
        {/* <Chat /> */}
      </>
    );
  }
);

export default Form;
