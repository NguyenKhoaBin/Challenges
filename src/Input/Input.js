import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const Input = ({
  name,
  control,
  type,
  className = "",
  placeholder = "",
  children,
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <div className="relative">
      <input
        name={name}
        placeholder={placeholder}
        id={name}
        type={type}
        className={`px-[25px] py-[15px] text-[#B2B3BD] text-base outline-none border  border-[#F1F1F3]  rounded-lg w-full  ${className}`}
        {...field}
        {...props}
      ></input>
      {children}
    </div>
  );
};
Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  control: PropTypes.object.isRequired,
};

export default Input;
