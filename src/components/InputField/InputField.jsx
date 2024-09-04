import React, { useEffect, useState } from "react";
import check from "./../../assets/icons/checkbox.webp";
import { useLocation } from "react-router-dom";
import SelectInput from "../SelectInput/SelectInput";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eye-slash.svg";
import codes from "country-calling-code";
import CountryCodeItem from "../CountryCodeItem/CountryCodeItem";
import downArrow from "../../assets/icons/down-arrow.webp";
import countryCodes from "country-codes-list";

const InputField = ({
  id,
  label,
  placeholder,
  type,
  containerClassName,
  onChange,
  required,
  name,
  textarea,
  pattern,
  fieldClassName,
  accept,
  containerId,
  selectItems,
  value,
  disabled,
  icon,
  badge,
  setBadge,
  selectedCode,
  note,
  setSelectedCode,
  max,
  min,
  labelClassName,
  itemChecked,
  fileName,
  hideRequired,
  dangerNote,
  successNote,
}) => {
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showCodes, setShowCodes] = useState(false);
  // console.log(fileName);

  useEffect(() => {
    if (type === "number") {
      const input = document.getElementById(id);
      const preventScrollChange = (event) => {
        event.preventDefault();
      };
      // Add non-passive event listener to the native input element
      input.addEventListener("wheel", preventScrollChange, { passive: false });
      // Clean up: Remove event listener when component unmounts or changes
      return () => {
        input.removeEventListener("wheel", preventScrollChange, {
          passive: false,
        });
      };
    }
  }, [type, id]); // Empty dependency array means this effect runs only on mount and unmount

  return (
    <div className={`relative ${containerClassName}`} id={containerId}>
      {type !== "checkbox" ? (
        <>
          {label && (
            <div className={`flex justify-between ${labelClassName}`}>
              <label htmlFor={id} className="ml-0 text-grey">
                {label}
              </label>
              {!(
                location.pathname === "/login" ||
                location.pathname === "/signup" ||
                location.pathname === "/signup-details"
              ) && (
                <span className="text-black-secondary">
                  {hideRequired ||
                    (!required ? (
                      <span className="text-button !font-light">Optional</span>
                    ) : (
                      <span className="text-interactive-light-destructive-focus text-button !font-light">
                        Required
                      </span>
                    ))}
                </span>
              )}
            </div>
          )}
          {type !== "file" || type !== "checkbox" ? (
            textarea ? (
              <textarea
                required={required}
                name={name}
                onChange={onChange}
                className={`border-[1px] border-surface-white-line text-[12px] resize-none bg-surface-white-surface-1 focus:bg-surface-white w-full px-[16px] py-[12px] focus:outline-interactive-light-focus rounded-[4px] placeholder:text-black-secondary text-paragraph-2 input-field ${fieldClassName}`}
                id={id}
                rows={6}
                placeholder={placeholder}
              ></textarea>
            ) : (
              // file type
              <div
                className={`${
                  type !== "multi-select" &&
                  `${label ? "mt-1" : ""}  ${
                    type === "file" ? "border-2" : "border-[1px]"
                  } border-surface-white-line text-[12px] ${
                    disabled
                      ? "bg-interactive-light-disabled"
                      : "bg-surface-white-surface-1"
                  } focus:bg-surface-white w-full focus:outline-interactive-light-focus rounded-[4px] ${fieldClassName} focus:bg-surface-white focus:border-primary`
                }`}
              >
                {type === "file" ? (
                  <>
                    <label
                      htmlFor={id}
                      className={`px-2 py-[12px] flex justify-between cursor-pointer ${
                        disabled ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      {fileName || placeholder}

                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.52827 1.52851C7.78862 1.26816 8.21073 1.26816 8.47108 1.52851L11.8044 4.86185C12.0648 5.1222 12.0648 5.54431 11.8044 5.80466C11.5441 6.06501 11.122 6.06501 10.8616 5.80466L8.66634 3.60939V9.99992C8.66634 10.3681 8.36786 10.6666 7.99967 10.6666C7.63148 10.6666 7.33301 10.3681 7.33301 9.99992V3.60939L5.13775 5.80466C4.8774 6.06501 4.45529 6.06501 4.19494 5.80466C3.93459 5.54431 3.93459 5.1222 4.19494 4.86185L7.52827 1.52851ZM1.99967 9.33325C2.36786 9.33325 2.66634 9.63173 2.66634 9.99992V12.6666C2.66634 12.8434 2.73658 13.013 2.8616 13.138C2.98663 13.263 3.1562 13.3333 3.33301 13.3333H12.6663C12.8432 13.3333 13.0127 13.263 13.1377 13.138C13.2628 13.013 13.333 12.8434 13.333 12.6666V9.99992C13.333 9.63173 13.6315 9.33325 13.9997 9.33325C14.3679 9.33325 14.6663 9.63173 14.6663 9.99992V12.6666C14.6663 13.197 14.4556 13.7057 14.0806 14.0808C13.7055 14.4559 13.1968 14.6666 12.6663 14.6666H3.33301C2.80257 14.6666 2.29387 14.4559 1.91879 14.0808C1.54372 13.7057 1.33301 13.197 1.33301 12.6666V9.99992C1.33301 9.63173 1.63148 9.33325 1.99967 9.33325Z"
                          fill="#202020"
                          fillOpacity="0.8"
                        />
                      </svg>
                    </label>
                    <input
                      onChange={onChange}
                      type={type}
                      required={required}
                      name={name}
                      disabled={disabled}
                      pattern={pattern}
                      // className={`placeholder:text-black-secondary focus:outline-interactive-light rounded-[4px] text-paragraph-2 bg-transparent file:cursor-pointer file:bg-primary file:border-[1px]  border-surface-white-line file:border-primary file:hover:bg-transparent file:hover:text-primary file:text-white file:px-[44px] file:py-[12px] file:transition file:duration-[0.2s] input-field focus:bg-surface-white ${
                      //   type !== "file" ? "px-2 py-[12px]" : "mx-2 my-[12px]"
                      // } ${
                      //   type === "file" && "cursor-pointer"
                      // } file:rounded-[3px] file:mr-3 w-full`}

                      className="hidden"
                      id={id}
                      placeholder={placeholder}
                      accept={accept}
                    />
                  </>
                ) : type === "multi-select" ? (
                  // multi check selects
                  selectItems.map((item, id) => (
                    <SelectInput item={item} id={id} key={id} />
                  ))
                ) : type === "tel" ? (
                  <div className="relative h-full flex items-center">
                    <label className="absolute top-0 bottom-0 w-fit h-full -left-2 px-2 m-auto">
                      <div className="flex items-center gap-1 h-full px-2">
                        <span>+{selectedCode}</span>
                        <img
                          src={downArrow}
                          alt=""
                          className={`!h-1 !w-auto transition ${
                            showCodes && "rotate-180"
                          }`}
                        />
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        onChange={(e) => setShowCodes(e.target.checked)}
                      />
                      {showCodes && (
                        <div className="absolute top-4 h-7 overflow-y-auto w-7 bg-white p-2 shadow-xl z-10">
                          {countryCodes
                            .all()
                            .sort((a, b) =>
                              a.countryNameEn.localeCompare(b.countryNameEn)
                            )
                            .map((code) => (
                              <CountryCodeItem
                                setSelectedCode={setSelectedCode}
                                {...code}
                                countryCodes={code.countryCallingCode}
                              />
                            ))}
                        </div>
                      )}
                    </label>
                    <input
                      onChange={onChange}
                      type={"number"}
                      required={required}
                      pattern={/^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/}
                      name={name}
                      className={`border border-surface-white-line text-[12px] rounded-[4px] bg-surface-white-surface-1 w-full pl-6 pr-[16px] py-[12px] focus:outline-interactive-light-focus placeholder:text-black-secondary text-paragraph-2 input-field focus:bg-surface-white ${fieldClassName}`}
                      id={id}
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      onChange={onChange}
                      type={
                        type === "password"
                          ? passwordVisible
                            ? "text"
                            : "password"
                          : type
                      }
                      required={required}
                      name={name}
                      value={value}
                      disabled={disabled}
                      pattern={pattern}
                      className={`placeholder:text-black-secondary disabled:bg-interactive-light-disabled disabled:border-interactive-light-disabled disabled:cursor-not-allowed focus:outline-none rounded-[4px] text-paragraph-2 bg-transparent file:cursor-pointer file:bg-primary file:border-[1px] border-[1px] border-surface-white-line focus:border-interactive-light-focus file:border-primary file:hover:bg-transparent file:hover:text-primary file:text-white file:px-[44px] file:py-[12px] file:transition file:duration-[0.2s] input-field focus:bg-surface-white ${
                        type !== "file" ? "px-2 py-[12px]" : "mx-2 my-[23px]"
                      } file:rounded-[3px] file:mr-3 w-full`}
                      id={id}
                      placeholder={placeholder}
                      max={max}
                      min={min}
                    />
                    {type === "password" && (
                      <label className="absolute right-2 top-0 bottom-0 my-auto flex items-center cursor-pointer">
                        <img
                          src={!passwordVisible ? eyeSlash : eye}
                          alt="password-visibility-handle"
                          className="w-2 h-2"
                        />

                        <input
                          type="checkbox"
                          className="hidden"
                          onChange={(e) => setPasswordVisible(e.target.checked)}
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            )
          ) : (
            <input
              onChange={onChange}
              type={type}
              required={required}
              name={name}
              className={`border-[1px] border-surface-white-line text-[12px] rounded-[4px] bg-surface-white-surface-1 w-full px-[16px] py-[12px] focus:outline-interactive-light-focus placeholder:text-black-secondary text-paragraph-2 input-field focus:bg-surface-white ${fieldClassName}`}
              id={id}
              placeholder={placeholder}
            />
          )}
        </>
      ) : (
        <div className="flex w-fit gap-[8px] items-center">
          <input
            type={type}
            required={required}
            name={name}
            id={id}
            className="hidden"
            checked={itemChecked && checked}
            onChange={(e) => {
              onChange && onChange(e);
              setChecked(e.target.checked);
            }}
            placeholder={placeholder}
          />

          <div
            className={`${
              (!checked || !itemChecked) &&
              "border-[1px]  border-surface-white-line text-[12px]"
            } rounded-[4px] w-[16px] h-[16px]`}
          >
            {!(checked || itemChecked) || <img src={check} alt="checkbox" />}
          </div>

          <label
            htmlFor={id}
            className={`text-black-primary text-subtitle-2 font-medium cursor-pointer ${labelClassName}`}
          >
            {label}
          </label>
        </div>
      )}

      {badge?.length ? (
        <div className="absolute top-[6px] right-[40px] my-auto flex gap-[4px] items-center bg-surface-white-surface-2 px-1 py-[6px] h-4 cursor-pointer">
          <div className="text-center text-interactive-light text-xs">
            {badge}
          </div>
          <div className="text-[21px]" onClick={() => setBadge("")}>
            &times;
          </div>
        </div>
      ) : (
        <></>
      )}

      {icon && (
        <img
          src={icon}
          alt={icon}
          className="absolute top-0 bottom-0 m-auto right-2 w-2 h-2"
        />
      )}

      <p
        className={`text-subtitle-2 ${
          dangerNote ? "text-interactive-light-destructive" : "text-grey-dark "
        } ${
          successNote
            ? "text-interactive-light-confirmation"
            : "text-grey-dark "
        }`}
      >
        {note}
      </p>
    </div>
  );
};

export default InputField;
