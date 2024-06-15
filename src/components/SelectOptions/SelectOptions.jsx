import React from "react";

const SelectOptions = ({
  id,
  label,
  onChange,
  options,
  containerClassName,
  labelClassName,
  note,
  placeholder,
  required,
  name,
  value,
}) => {
  return (
    <div className={`input ${containerClassName}`}>
      <div className="flex justify-between">
        {label && (
          <label htmlFor={id} className={`text-grey ${labelClassName}`}>
            {label}
          </label>
        )}
        {!required ? (
          <span className="text-button !font-light">Optional</span>
        ) : (
          <span className="text-interactive-light-destructive-focus text-button !font-light">
            Required
          </span>
        )}
      </div>
      {/* {label && <br />} */}
      <div className="border-[1px] border-surface-white-line text-[12px] mt-1 resize-none bg-surface-white-surface-1 focus:bg-surface-white w-full px-[16px] focus:outline-interactive-light-focus rounded-[4px] placeholder:text-black-secondary text-paragraph-2 ">
        <select
          id={id}
          onChange={onChange}
          name={name}
          value={value}
          className="input-field bg-surface-white-surface-1 w-full h-full py-[12px] focus:outline-none cursor-pointer capitalize"
        >
          {placeholder && <option key={0}>{placeholder}</option>}
          {options.map((option, key) => (
            <option
              key={key + 1}
              selected={option.selected || false}
              value={options.length === 0 ? "Loading..." : option}
              className="border-[1px] p-2 text-paragraph-2"
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      <p className="text-subtitle-2 text-grey-dark">{note}</p>
    </div>
  );
};

export default SelectOptions;
