import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Chat from "../Chat/Chat";
import { config } from "../../constants";
import SelectOptions from "../SelectOptions/SelectOptions";
import { ProfileContext } from "../../contexts/ProfileContext";

const Form = ({ fields, instruction, backendUrl, uIdKey, id }) => {
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
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(uIdKey, user.ID);

    for (const field of fields) {
      /*****============ working codes =============*******/
      if (Object.keys(field).includes("selectItems")) {
        const selected = field.selectItems.map((item) =>
          item.selected ? item.text : ""
        );
        formData.append(field.name, selected.join(", "));
      } else if (e.target[field.name]?.type !== "file") {
        formData.append(field.name, e.target[field.name]?.value);
      } else {
        formData.append(field.name, e.target[field.name].files[0]);
      }
    }

    if (id === "video-distribution") {
      const selectItems = fields[5].selectItems.filter(
        (item) => item.selected === true
      );
      const selectedItems = [];
      selectItems.map((item) => selectedItems.push(item.text));

      formData.append(
        "video_distribution_content_type",
        selectedItems.join(", ")
      );
    }

    for (const value of formData.entries()) {
      console.log(value);
    }

    toastId.current = toast("Loading...", {
      autoClose: false,
      position: "bottom-right",
    });

    if (Object.entries(formData)) {
      axios.post(backendUrl, formData, {
        headers: {
          Authorization: `Bearer ${profileData.user_token}`,
        },
      }).then(({ data }) => {
        if (data.success) {
          // console.log(data);
          toast.update(toastId.current, {
            type: toast.TYPE.SUCCESS,
            render: "Success",
            position: "bottom-right",
            autoClose: 5000,
          });
        }
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

    const entries = Object.values(formData).every((value) => value.length > 0);
    console.log(Object.values(formData));
    setDisabled(!entries);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        id={id || "myForm"}
        ref={formRef}
        className="mt-[90px] rounded-[15px] shadow-lg pt-[29px] px-[50px] 2xl:px-[60px] 3xl:px-[101px] pb-[80px] bg-white-secondary w-7/12 mx-auto"
      >
        {fields.map((props, key) =>
          props.type === "dropdown" ? (
            <SelectOptions {...props} key={props} />
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
      <Chat />
    </>
  );
};

export default Form;
