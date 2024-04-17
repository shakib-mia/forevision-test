import React from "react";

const SelectOptions = ({
  id,
  label,
  onChange,
  options,
  containerClassName,
}) => {
  return (
    <div className={`input ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-grey">
          {label}
        </label>
      )}
      {label && <br />}
      <select
        id={id}
        onChange={onChange}
        className="border-[1px] border-surface-white-line text-[12px] mt-1 resize-none bg-surface-white-surface-1 focus:bg-surface-white w-full px-[16px] py-[12px] focus:outline-interactive-light-focus rounded-[4px] placeholder:text-black-secondary text-paragraph-2 input-field"
      >
        {options.map((option, key) => (
          <option
            key={key + 1}
            value={options.length === 0 ? "Loading..." : option}
            className="border-[1px] p-2 text-paragraph-2"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptions;
