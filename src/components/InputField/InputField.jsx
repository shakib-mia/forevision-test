import React, { useState } from "react";
import check from "./../../assets/icons/checkbox.webp";
import { useLocation } from "react-router-dom";
import SelectInput from "../SelectInput/SelectInput";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eye-slash.svg";
import codes from "country-calling-code";
import CountryCodeItem from "../CountryCodeItem/CountryCodeItem";
import downArrow from "../../assets/icons/down-arrow.webp";

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
}) => {
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showCodes, setShowCodes] = useState(false);

  return (
    <div className={`relative ${containerClassName}`} id={containerId}>
      {type !== "checkbox" ? (
        <>
          {label && (
            <div className="flex justify-between">
              <label htmlFor={id} className="ml-0 text-grey">
                {label}
              </label>
              <span className="text-black-secondary">
                {!required && location.pathname === "/signup-details"
                  ? "Optional"
                  : ""}
              </span>
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
                  `border-[1px] ${
                    label ? "mt-1" : ""
                  } border-surface-white-line text-[12px] bg-surface-white-surface-1 focus:bg-surface-white w-full focus:outline-interactive-light-focus rounded-[4px] ${fieldClassName} focus:bg-surface-white focus:border-primary`
                }`}
              >
                {type === "file" ? (
                  <input
                    onChange={onChange}
                    type={type}
                    required={required}
                    name={name}
                    pattern={pattern}
                    className={`placeholder:text-black-secondary focus:outline-interactive-light rounded-[4px] text-paragraph-2 bg-transparent file:cursor-pointer file:bg-primary file:border-[1px]  border-surface-white-line file:border-primary file:hover:bg-transparent file:hover:text-primary file:text-white file:px-[44px] file:py-[12px] file:transition file:duration-[0.2s] input-field focus:bg-surface-white ${
                      type !== "file" ? "px-2 py-[12px]" : "mx-2 my-[12px]"
                    } ${
                      type === "file" && "cursor-pointer"
                    } file:rounded-[3px] file:mr-3 w-full`}
                    id={id}
                    placeholder={placeholder}
                    accept=".png, .jpg, .jpeg, .svg, .webp, .bmp, .tif, .tiff, .raw, .cr2, .nef, .orf, .sr2"
                  />
                ) : type === "multi-select" ? (
                  // multi check selects
                  selectItems.map((item, id) => (
                    <SelectInput item={item} id={id} key={id} />
                  ))
                ) : type === "tel" ? (
                  <div className="relative h-full flex items-center">
                    <label className="absolute top-0 bottom-0 w-fit h-fit left-2 m-auto">
                      <div className="flex items-center gap-1">
                        <span>+{selectedCode}</span>{" "}
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
                        <div className="absolute top-4 h-7 overflow-y-auto w-7 bg-white p-2 shadow-xl">
                          {codes.map((code) => (
                            <CountryCodeItem
                              setSelectedCode={setSelectedCode}
                              countryCodes={code}
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
            onChange={(e) => setChecked(e.target.checked)}
            placeholder={placeholder}
          />

          <div
            className={`${
              !checked && "border-[1px]  border-surface-white-line text-[12px]"
            } rounded-[4px] w-[16px] h-[16px]`}
          >
            {checked && <img src={check} alt="checkbox" />}
          </div>

          <label
            htmlFor={id}
            className="text-black-primary text-subtitle-2 font-medium"
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

      <p className="text-subtitle-2 text-grey-dark">{note}</p>
    </div>
  );
};

export default InputField;
